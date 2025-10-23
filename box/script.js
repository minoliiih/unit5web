//for the page to fully load
window.addEventListener("load", () => {
  const popup = document.querySelector(".popup");
  const closeBtn = popup.querySelector(".close-btn");
  const cancelBtn = document.getElementById("cancelBtn"); // optional if you have it


  //to show the popup when the site loads
  popup.style.display = "block";

  //closing the popup window if user clicks X or Cancel
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }
});

document.getElementById("okButton").addEventListener("click", () => {
  // A list of pages to open — you can add or remove as many as you like
  const pages = [
    "/new window1/window2.html",
    "/new window1/window3.html",
    "/new window1/window4.html"
  ];

  // For each page, open it in a random position and size
  pages.forEach((page, i) => {
    // Random width: between 250px and 500px
    const width = Math.floor(Math.random() * 250) + 250;

    // Random height: between 200px and 400px
    const height = Math.floor(Math.random() * 200) + 200;

    // Random screen position
    const left = Math.floor(Math.random() * (window.screen.availWidth - width));
    const top = Math.floor(Math.random() * (window.screen.availHeight - height));

    //Increasing the number of pages in the array -- repeating some (if u want)
    const pages = Array(10).fill("/new window1/windowex.html");

    //Delaying each popup slightly
    pages.forEach((page, i) => {
  setTimeout(() => {
    // same code as before here
  }, i * 300); // 300ms delay between each
});

    // Open the popup
    window.open(
      page,
      "popup" + i,
      `width=${width},height=${height},left=${left},top=${top}`
    );
  });
});
