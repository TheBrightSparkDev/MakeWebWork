console.log("Copilot.js loaded");

document.addEventListener('DOMContentLoaded', function () {
  const csrfToken = document.getElementById('csrf-token').value;

  // Safely access the URLs only *after* DOM is ready
  const renameUrl = window.urls.rename;
  const deleteUrl = window.urls.delete;
  const cycleUrl = window.urls.cycle;

  // === RENAME ===
  document.addEventListener('click', function (e) {
    if (e.target.matches('.rename-media-btn')) {
      const mediaId = e.target.dataset.mediaId;
      document.getElementById('renameMediaId').value = mediaId;
      document.getElementById('newFileName').value = '';
      const modal = new bootstrap.Modal(document.getElementById('renameMediaModal'));
      modal.show();
    }
  });

  document.getElementById('renameMediaForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const mediaId = document.getElementById('renameMediaId').value;
    const newName = document.getElementById('newFileName').value;

    const formData = new FormData();
    formData.append('mediaId', mediaId);
    formData.append('newFileName', newName);

    fetch(renameUrl, {
      method: 'POST',
      headers: { 'X-CSRFToken': csrfToken },
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        const cardTitle = document.querySelector(`#media-card-${mediaId} .card-title`);
        if (cardTitle) cardTitle.textContent = data.newFileName;
        bootstrap.Modal.getInstance(document.getElementById('renameMediaModal')).hide();
      } else {
        alert(data.message || 'Rename failed.');
      }
    })
    .catch(() => alert('Network error.'));
  });

  // === DELETE ===
  document.querySelectorAll('.delete-media-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const mediaId = this.dataset.mediaId;
      if (confirm('Are you sure you want to delete this media?')) {
        fetch(deleteUrl, {
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `mediaId=${mediaId}`
        })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            document.getElementById(`media-card-${mediaId}`).parentElement.remove();
          } else {
            alert('Delete failed.');
          }
        });
      }
    });
  });

  // === CYCLE COLOUR ===
  function removeClasses(el, classString, label) {
    if (!classString) return;
    const classes = classString.trim().split(/\s+/);
    const removed = [];

    console.log(`[${label}] Current classes before removal:`, Array.from(el.classList));
    console.log(`[${label}] Trying to remove:`, classes);

    for (const cls of classes) {
      if (el.classList.contains(cls)) {
        el.classList.remove(cls);
        removed.push(cls);
      }
    }

    console.log(`[${label}] Removed classes:`, removed);
  }

  function sendCycleRequest(mediaId, projectId, isText, callback) {
    const formData = new FormData();
    formData.append('mediaId', mediaId);
    formData.append('projectId', projectId);
    formData.append('isText', isText ? 'true' : 'false');

    fetch(cycleUrl, {
      method: 'POST',
      headers: { 'X-CSRFToken': csrfToken },
      body: formData
    })
    .then(async res => {
      const text = await res.text();
      console.log('[DEBUG] Raw response:', text);
      try {
        const json = JSON.parse(text);
        return json;
      } catch (e) {
        console.error('[ERROR] JSON parse failed:', e);
        throw new Error('Invalid JSON');
      }
    })
    .then(data => {
      if (data.status === 'success') callback(data);
      else alert('Failed: ' + (data.message || 'Server error'));
    })
    .catch((e) => {
      console.error('[ERROR] Network or JSON failure:', e);
      alert('Network error');
    });
  }

  function cycleMedia(card, isText) {
    const mediaId = card.dataset.mediaId;
    const projectId = card.dataset.projectId;

    const oldText = card.dataset.textClass || '';
    const oldBg = card.dataset.bgClass || '';

    removeClasses(card, oldText, 'TEXT');
    removeClasses(card, oldBg, 'BACKGROUND');

    sendCycleRequest(mediaId, projectId, isText, function (data) {
      const {
        textColorClass,
        textModifierClass,
        bgColorClass,
        bgModifierClass
      } = data;

      const newTextClasses = [textColorClass, textModifierClass].filter(Boolean).join(' ');
      const newBgClasses = [bgColorClass, bgModifierClass].filter(Boolean).join(' ');

      const classListToAdd = [...newTextClasses.split(' '), ...newBgClasses.split(' ')].filter(Boolean);
      card.classList.add(...classListToAdd);

      card.dataset.textClass = newTextClasses;
      card.dataset.bgClass = newBgClasses;

      console.log('[TEXT] Final textClass:', newTextClasses);
      console.log('[BACKGROUND] Final bgClass:', newBgClasses);
      console.log('[FINAL] Classes now:', Array.from(card.classList));
    });
  }

  document.querySelectorAll('.cycle-background-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const mediaId = this.dataset.mediaId;
      const card = document.getElementById(`media-card-${mediaId}`);
      card.dataset.mediaId = mediaId;
      card.dataset.projectId = this.dataset.projectId;
      cycleMedia(card, false);
    });
  });

  document.querySelectorAll('.cycle-text-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const mediaId = this.dataset.mediaId;
      const card = document.getElementById(`media-card-${mediaId}`);
      card.dataset.mediaId = mediaId;
      card.dataset.projectId = this.dataset.projectId;
      cycleMedia(card, true);
    });
  });

  // === TOGGLE EDIT SECTION ===
    document.querySelectorAll('.toggle-edit-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const collapseEl = document.getElementById('allImages'); // fixed
        if (!collapseEl) return;

        const controls = collapseEl.querySelectorAll('.media-controls');
        controls.forEach(ctrl => {
            ctrl.classList.toggle('d-none');
            });
        });
    });

});

// ADD SECTION AREA 
document.addEventListener('DOMContentLoaded', function () {
  bindFlipCards();

  const sectionChooserBtn = document.getElementById('showAddSectionChooser');
  const sectionTypeForm = document.getElementById('sectionTypeChooser');
  const sectionTypeSelector = document.getElementById('sectionTypeSelector');
  const showFormBtn = document.getElementById('showSectionForm');
  const formContainer = document.getElementById('addSectionFormContainer');
  const previewContainer = document.getElementById('editableSectionPreview');
  const projectId = document.getElementById('projectId')?.value;

  let selectedMediaIds = [];
  let uploadedMedia = [];

  if (sectionChooserBtn && showFormBtn && sectionTypeSelector && formContainer && previewContainer) {
    sectionChooserBtn.addEventListener('click', () => {
      sectionTypeForm.classList.remove('d-none');
    });

    showFormBtn.addEventListener('click', () => {
      const type = sectionTypeSelector.value;
      if (!type || !projectId) return;

      fetch(`/copilot/load-editable-section/?type=${type}&projectId=${projectId}`)
        .then(res => res.text())
        .then(html => {
          previewContainer.innerHTML = html;
          formContainer.classList.remove('d-none');
          const sectionTypeInput = document.getElementById('sectionTypeInput');
          if (sectionTypeInput) sectionTypeInput.value = type;
          bindFlipCards();
        })
        .catch(err => {
          console.error('Failed to load editable section:', err);
        });
    });
  }

  function loadMediaIntoModal(mediaList, minMedia, maxMedia) {
    const mediaGrid = document.getElementById('mediaGrid');
    const videoGrid = document.getElementById('videoGrid');
    const modalElement = document.getElementById('mediaSelectorModal');
    const modal = new bootstrap.Modal(modalElement);

    mediaGrid.innerHTML = '';
    videoGrid.innerHTML = '';
    selectedMediaIds = [];

    mediaList.forEach(media => {
      const mediaType = media.url.endsWith('.mp4') ? 'video' : 'image';
      const grid = mediaType === 'video' ? videoGrid : mediaGrid;

      const col = document.createElement('div');
      col.className = `col media-item ${mediaType}`;
      col.dataset.id = media.id;

      col.innerHTML = `
        <div class="card h-100 selectable ${mediaType} position-relative">
          ${mediaType === 'video'
            ? `<video class="w-100" muted><source src="${media.url}" type="video/mp4"></video>`
            : `<img src="${media.url}" class="card-img-top" alt="media">`}
          <div class="card-body text-center small">${media.name || 'Media'}</div>
          <div class="check-overlay position-absolute top-0 end-0 p-2" style="display:none;"></div>
        </div>
      `;

      col.addEventListener('click', () => {
        col.classList.toggle('selected');
        const id = media.id;
        const overlay = col.querySelector('.check-overlay');

        if (selectedMediaIds.includes(id)) {
          selectedMediaIds = selectedMediaIds.filter(x => x !== id);
          overlay.style.display = 'none';
        } else {
          if (selectedMediaIds.length >= maxMedia) return;
          selectedMediaIds.push(id);
          overlay.style.display = 'block';
        }
      });

      grid.appendChild(col);
    });

    const bsModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    bsModal.show();
  }


  const confirmBtn = document.getElementById('confirmMediaSelection');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const dataTag = previewContainer.querySelector('data');
      const modalElement = document.getElementById('mediaSelectorModal');

      if (!dataTag) {
        console.log('No media requirement defined for this section. If you want to allow media selection, add: <data maxMedia="2" minMedia="2"></data>');
        bootstrap.Modal.getInstance(modalElement)?.hide();
        return;
      }

      const minMedia = parseInt(dataTag.getAttribute('minMedia') || '1');
      const maxMedia = parseInt(dataTag.getAttribute('maxMedia') || '1');

      if (selectedMediaIds.length < minMedia || selectedMediaIds.length > maxMedia) {
        alert(`You must select between ${minMedia} and ${maxMedia} media item(s).`);
        return;
      }

      // Clear old media inputs
      document.querySelectorAll('input[name="mediaIds[]"]').forEach(el => el.remove());

      // Append new hidden inputs
      const form = document.querySelector('form.section-form');
      console.log('Form found:', form);

      if (!form) {
        console.warn('No form with class "section-form" found. Media selection not applied.');
        return;
      }

      selectedMediaIds.forEach(id => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'mediaIds[]';
        input.value = id;
        form.appendChild(input);
      });

      // Show selected thumbnails
      const previewArea = document.getElementById('selectedMediaPreview');
      if (previewArea) {
        previewArea.innerHTML = '';
        selectedMediaIds.forEach(id => {
          const media = uploadedMedia.find(m => m.id === id);
          if (!media) return;
          const thumb = document.createElement('img');
          thumb.src = media.url;
          thumb.alt = media.name || 'Media';
          thumb.className = 'img-thumbnail me-2';
          thumb.style.maxWidth = '100px';
          previewArea.appendChild(thumb);
        });
      }

      // Hide modal
      bootstrap.Modal.getInstance(modalElement)?.hide();
    });
  }

  document.addEventListener('click', function (e) {
    if (e.target.matches('.open-media-selector')) {
      const dataTag = previewContainer.querySelector('data');
      if (!dataTag) {
        console.log('No media requirement defined for this section. If you want to allow media selection, add: <data maxMedia="2" minMedia="2"></data>');
        return;
      }

      const minMedia = parseInt(dataTag.getAttribute('minMedia') || '1');
      const maxMedia = parseInt(dataTag.getAttribute('maxMedia') || '1');

      const mediaElems = document.querySelectorAll('[id^="media-card-"] img, [id^="media-card-"] video');

      uploadedMedia = Array.from(mediaElems).map(el => {
        const card = el.closest('[id^="media-card-"]');
        const id = card ? card.id.split('-')[2] : null;
        if (!id) return null;

        let url = '';
        let name = '';

        if (el.tagName.toLowerCase() === 'video') {
          const source = el.querySelector('source');
          url = source ? source.src : '';
          name = el.getAttribute('data-name') || 'Video';
        } else {
          url = el.src;
          name = el.alt || 'Image';
        }

        return { id, url, name };
      }).filter(Boolean); // Filter out any nulls

      loadMediaIntoModal(uploadedMedia, minMedia, maxMedia);
    }
  });

    console.log(
    document.getElementById('mediaSelectorModal'),
    document.getElementById('mediaGrid'),
    document.getElementById('mediaLimitMsg')
  );


  // bind cards section


  function bindFlipCards() {
    document.querySelectorAll('.flip-card').forEach(card => {
      const inner = card.querySelector('.flip-card-inner');

      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('flipped')) {
          card.classList.add('tease');
        }
      });

      card.addEventListener('animationend', () => {
        card.classList.remove('tease');
      });

      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        card.classList.remove('tease');
      });
    });
  }


  // business card flipping section
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.flip-card').forEach(card => {
      const inner = card.querySelector('.flip-card-inner');

      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('flipped')) {
          card.classList.add('tease');
        }
      });

      card.addEventListener('animationend', () => {
        card.classList.remove('tease');
      });

      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        card.classList.remove('tease');
      });
    });
  });
  
});

