    document.getElementById('not-robot').addEventListener('change', function() {
      if (this.checked) {
        // Redirect to your other HTML page
        window.location.href = "webcam.html";
      }
    });