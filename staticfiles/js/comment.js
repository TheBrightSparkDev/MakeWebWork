document.addEventListener("DOMContentLoaded", () => {
  bindCommentForms();
});

function bindCommentForms() {
  // Unbind existing event listeners by replacing forms with clones
  document.querySelectorAll(".comment-form").forEach(form => {
    const clone = form.cloneNode(true); // deep clone
    form.parentNode.replaceChild(clone, form);
  });

  // Re-bind all current forms
  document.querySelectorAll(".comment-form").forEach(form => {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(form);
      const sectionId = form.dataset.sectionId;
      const commentWrapper = document.querySelector(`#comment-wrapper-${sectionId}`);
      const submitBtn = form.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      try {
        const response = await fetch(window.location.href, {
          method: "POST",
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          },
          body: formData
        });

        if (!response.ok) {
          alert("Failed to post comment.");
          return;
        }

        const html = await response.text();

        if (commentWrapper) {
          commentWrapper.innerHTML = html;
          bindCommentForms(); // Rebind again after updating the DOM
        }

      } catch (error) {
        console.error("Error submitting comment:", error);
        alert("An error occurred. Please try again.");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send';
        }
      }
    });
  });
}
