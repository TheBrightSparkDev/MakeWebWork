// Constants
const animationSpeeds = {
  hideBehind: 300,
  moveSwatch: 500,
  expandOut: 400,
};
const debugColorSwatches = true
const baseColors = [
  "materialize-red", "red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue",
  "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange",
  "brown", "blue-grey", "grey", "black", "white"
];
const modifiers = [
  "", "darken-4", "darken-3", "darken-2", "darken-1",
  "lighten-1", "lighten-2", "lighten-3", "lighten-4", "lighten-5",
  "accent-1", "accent-2", "accent-3", "accent-4"
];
const noaccents = ["", "darken-4", "darken-3", "darken-2", "darken-1",
  "lighten-1", "lighten-2", "lighten-3", "lighten-4", "lighten-5"];
const transparencies = ["", "op-1", "op-2", "op-3", "op-4", "op-5", "op-6", "op-7", "op-8", "op-9"];
const nonModifiableColors = ["black", "white"];
const noAccents = ["brown", "blue-grey", "grey", "materialize-red"];


// building the initial modal

function showColorModal(triggerEl) {
  const modal = document.getElementById('colorSelectorModal');
  const swatchContainer = document.getElementById('SwatchContainer');

  // Show modal first so it has layout to position
  modal.classList.remove('d-none');

  // Populate base swatches
  populateBaseSwatches(swatchContainer, triggerEl);

  // Position modal next to the triggering element
  const rect = triggerEl.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  modal.style.top = `${rect.bottom + scrollTop + 8}px`;  // Add small vertical gap
  modal.style.left = `${rect.left + scrollLeft}px`;
}

// this populates the swatches area
function populateBaseSwatches(container, triggerEl) {
    populateOptions(baseColors,"base","none",triggerEl);
    const firstEl = container.querySelector('.color-swatch');
    expandOut(firstEl, 1);
}
// end building the initial modal


// populating the options
function populateOptions(dataset, step, alreadyChosen, triggerEl, anchorIndex = 5) {
    const container = document.getElementById('SwatchContainer');
    container.innerHTML = '';
    container.style.position = 'relative';

    if (step === "base") {
        dataset.forEach(value => {
            const swatch = document.createElement('div');
            swatch.className = `color-swatch ${value}`;
            swatch.dataset.value = value;
            swatch.dataset.step = step;
            applySwatchStyle(swatch);

            const isUnmodifiable = nonModifiableColors.includes(value);

            swatch.addEventListener('click', () => {
                hideBehind(swatch);

                setTimeout(() => {
                    if (isUnmodifiable) {
                        const [className, ...mods] = value.split(' ');
                        const modString = mods.join(' ');
                        populateInputs(className, triggerEl, modString);
                        hideColorModal();
                    } else {
                        populateOptions(modifiers, "modifiers", value, triggerEl, 5);
                    }
                }, animationSpeeds.hideBehind + animationSpeeds.moveSwatch);
            });

            container.appendChild(swatch);
        });

        requestAnimationFrame(() => {
            const firstEl = container.querySelector('.color-swatch');
            if (firstEl) expandOut(firstEl, 0);
        });

    } else if (step === "modifiers") {
        const isNoAccent = noAccents.includes(alreadyChosen);
        const currentSet = isNoAccent ? dataset : accents;

        currentSet.forEach(value => {
            const swatch = document.createElement('div');
            swatch.className = `color-swatch ${alreadyChosen} ${value}`;
            swatch.dataset.value = value;
            swatch.dataset.step = step;
            applySwatchStyle(swatch);

            if (alreadyChosen.includes(value)) swatch.classList.add('selected');

            swatch.addEventListener('click', () => {
                hideBehind(swatch);

                setTimeout(() => {
                    populateOptions(transparencies, "transparencies", `${alreadyChosen} ${value}`, triggerEl, 1);
                }, animationSpeeds.hideBehind + animationSpeeds.moveSwatch);
            });

            container.appendChild(swatch);
        });

        requestAnimationFrame(() => {
            const selected = container.querySelector('.selected') || container.querySelector('.color-swatch');
            if (selected) expandOut(selected, anchorIndex);
        });

    } else if (step === "transparencies") {
        dataset.forEach(value => {
            const swatch = document.createElement('div');
            swatch.className = `color-swatch ${value}`;
            swatch.dataset.value = value;
            swatch.dataset.step = step;
            applySwatchStyle(swatch);

            if (alreadyChosen.includes(value)) swatch.classList.add('selected');

            swatch.addEventListener('click', () => {
                hideBehind(swatch);

                setTimeout(() => {
                    const [className, ...mods] = alreadyChosen.split(' ');
                    const modString = mods.join(' ');
                    populateInputs(className, triggerEl, modString);
                    hideColorModal();
                }, animationSpeeds.hideBehind + animationSpeeds.moveSwatch);
            });

            container.appendChild(swatch);
        });

        requestAnimationFrame(() => {
            const selected = container.querySelector('.selected') || container.querySelector('.color-swatch');
            if (selected) expandOut(selected, anchorIndex);
        });
    }
}



// Swatch styles

function applySwatchStyle(swatch) {
  swatch.style.position = 'absolute';
  swatch.style.top = '0px';
  swatch.style.left = '0px';
  swatch.style.zIndex = 1;
  swatch.style.opacity = 1;
  swatch.style.transition = 'all 300ms ease-in-out';
}


// cleanup functions 
function removeBehind(swatch, container){
    const allSwatches = container.querySelectorAll('.color-swatch');
    allSwatches.forEach(el => {
        if (el !== swatch) {
            el.remove();
        }
    });
}

// populating the input
function populateInputs(className, triggerEl, modifiers){
    // Get whether the target was for text
    const isText = triggerEl.dataset.text === 'true';

    // Find the hidden input fields inside the trigger element
    const baseInput = triggerEl.querySelector('[data-role="base"]');
    const modInput = triggerEl.querySelector('[data-role="modifier"]');

    // Adjust className with -text if it's for text color
    const finalBase = isText ? `${className}-text` : className;

    // Set the values into the form fields
    if (baseInput) baseInput.value = finalBase;
    if (modInput) modInput.value = modifiers;

    // Construct full class string
    const fullClass = [finalBase, modifiers].filter(Boolean).join(" ");

    // Update preview box if present
    const preview = triggerEl.querySelector('.color-preview-box');
    if (preview) {
        preview.className = 'color-preview-box ' + fullClass;
    }

    // Update main trigger element's visible style
    triggerEl.className = triggerEl.dataset.originalClass + ' ' + fullClass;
}
// open and closing modal start

function hideColorModal() {
  const modal = document.getElementById('colorSelectorModal');
  modal.classList.add('d-none');
}

document.addEventListener('DOMContentLoaded', () => {
  // Bind open triggers
  document.querySelectorAll('.customColorSelector').forEach(el => {
    el.addEventListener('click', () => showColorModal(el));
  });

  // Bind close button
  document.getElementById('cancelColorBtn')?.addEventListener('click', hideColorModal);
});

// open and closing modal end

// this section covers the animations start
function hideBehind(target) {
    if (debugColorSwatches){
        console.log("inside hideBehind")
        console.log(target)
    }
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => {
        if (swatch !== target) {
        swatch.style.transition = `all ${animationSpeeds.hideBehind}ms ease-in-out`;
        swatch.style.transform = `scale(0.5) translateZ(-20px)`;
        swatch.style.opacity = '0.3';
        swatch.style.zIndex = '1';
        }
    });
    target.style.zIndex = '2';
}

function moveSwatch(swatch, positionIndex) {
    if (debugColorSwatches){
        console.log("inside moveSwatch")
        console.log(swatch)
        console.log(positionIndex)
    }
    const container = document.getElementById('SwatchContainer');
    const targetX = positionIndex * (swatch.offsetWidth + 8); // 8px margin
    swatch.style.transition = `transform ${animationSpeeds.moveSwatch}ms ease`;
    swatch.style.transform = `translateX(${targetX}px) scale(1.2)`;
    swatch.style.zIndex = '3';
}

function expandOut(fromElement, anchorIndex) {
    if (debugColorSwatches) {
        console.log("inside expandOut");
        console.log("anchorIndex:", anchorIndex);
    }

    const container = document.getElementById('SwatchContainer');
    const allSwatches = Array.from(container.querySelectorAll('.color-swatch'));
    const swatchWidth = fromElement.offsetWidth + 8;

    // Keep the selected swatch fixed in position
    const anchorX = anchorIndex * swatchWidth;
    fromElement.style.transform = `translateX(${anchorX}px) scale(1.2)`;
    fromElement.style.transition = `transform ${animationSpeeds.expandOut}ms ease-in-out`;
    fromElement.style.zIndex = '3';

    let leftIndex = anchorIndex - 1;
    let rightIndex = anchorIndex + 1;

    allSwatches.forEach(swatch => {
        if (swatch === fromElement) return;

        const value = swatch.dataset.value || '';
        let pos = value.startsWith('darken-') || value === '' ? leftIndex-- : rightIndex++;
        const x = pos * swatchWidth;

        swatch.style.transition = `transform ${animationSpeeds.expandOut}ms ease-in-out`;
        swatch.style.transform = `translateX(${x}px) scale(1)`;
        swatch.style.opacity = '1';
        swatch.style.zIndex = '1';
    });
}



// end of animations 
