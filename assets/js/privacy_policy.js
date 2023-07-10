// ============= hidden message box =============
let messageBox = document.querySelector(".message-box.main");
let messageHeader = document.querySelector(".message-box .message-header");

messageHeader.addEventListener("click",() => {
  messageBox.classList.toggle("show");
  if(!messageBox.classList.contains("show")) {
    messageBox.style.bottom = "-500px";
  } else {
    messageBox.style.bottom = "0";
  }
});

