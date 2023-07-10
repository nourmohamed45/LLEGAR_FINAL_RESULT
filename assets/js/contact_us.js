let boxes = document.querySelectorAll(".contact-with-us .container .box");

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    let link = box.querySelector("a");
    if (link) {
      link.click();
    }
  });
});
