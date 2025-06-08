document.addEventListener("DOMContentLoaded", function () {
  const commentForms = document.querySelectorAll(".comment-form");

  commentForms.forEach(form => {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(form);
      const sectionId = form.dataset.sectionId;
      const commentWrapper = document.querySelector(`#comment-wrapper-${sectionId}`);

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
        }

        // Clear form fields
        form.reset();
      } catch (error) {
        console.error("Error submitting comment:", error);
        alert("An error occurred. Please try again.");
      }
    });
  });
});

