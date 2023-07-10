import { request } from "./service/index.mjs";

let paymentForm = document.querySelector(
  ".payment-gateway .container .payment-right form"
);
let spinner = document.querySelector(".spinner__container");
let cardName = document.getElementById("cardName");
let cardNumberInput = document.getElementById("cardNumber");
let expiryInput = document.getElementById("expiryDate");
let cvvInput = document.getElementById("cvvNumber");
let startDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");

let patternCardNumber = /^\d{4} \d{4} \d{4} \d{4}$/;
let patternExpiryDate = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;
let patternCvv = /^\d{3}$/;

paymentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    cardName.value === "" ||
    cardNumberInput.value === "" ||
    expiryInput.value === "" ||
    cvvInput.value === "" ||
    patternCvv.test(cardNumberInput)
  ) {
    alert("Please Enter Information");
  } else if (
    patternCardNumber.test(cardNumberInput.value) ||
    patternExpiryDate.test(expiryInput.value) ||
    patternCvv.test(cvvInput.value)
  ) {
    setTimeout(() => {
      scrollToPaymentGatewayHeader();
    }, 1000);
  } else if (
    !patternCardNumber.test(cardNumberInput.value) ||
    !patternExpiryDate.test(expiryInput.value) ||
    !patternCvv.test(cvvInput.value)
  ) {
    setTimeout(() => {
      scrollToPaymentGatewayHeader();
    }, 1000);
  }

  const body = {
    acceptCondition: "true",
    startDate: startDate.value,
    endDate: endDate.value,
    cardName: cardName.value,
    cardNumber: cardNumberInput.value,
    CVV: cvvInput.value,
    expiryDate: expiryInput.value,
  };
  console.log(body);
  (async function (id = "64a74370e67c6d0054a98bf7") {
    try {
      spinner.style.display = "flex";
      const booking = await request({
        url: `/items/${localStorage.getItem("itemID") || id}/bookings`,
        method: "POST",
        data: body,
        navigate: "/",
      });
      spinner.style.display = "none";
      console.log(booking);
      if (booking?.status === "success") {
        ShowCongratsPopUp();
      } else {
        showFaildPopUp();
      }
    } catch (err) {
      console.error(err);
    }
  })();
});

// Start Showing faild PopUp

let paymentBtn = document.querySelector(".btn-payment");

function showFaildPopUp() {
  let faildPopup = document.createElement("section");
  faildPopup.innerHTML = `
    <div class="popup-outer">
      <div class="popup-box congratz-popup-box">
        <img src="./assets/imgs/faild img.png" alt="">
        <h2 style = "color: var(--wrong-color)">Payment Faild</h2>
        <p>You have failed rent item.</p>
        <button style = "background-color: var(--wrong-color)" class="ok">Ok</button>
      </div>
    </div>
  `;
  document
    .querySelector("header")
    .insertAdjacentElement("afterend", faildPopup);

  // ========= Click on payment Button =========

  let okPopup = document.querySelector("section .ok");

  okPopup.addEventListener("click", (e) => {
    e.preventDefault();
    let section = document.querySelector("section");
    section.parentNode.removeChild(section);
  });

  // ========== Clicking on popup-outer to close the popup ==========

  let closePopup = document.querySelector("section .popup-outer");

  closePopup.addEventListener("click", (event) => {
    const popupBox = document.querySelector(".popup-box");
    const targetElement = event.target;

    if (!popupBox.contains(targetElement)) {
      // Remove the section from the DOM
      let section = document.querySelector("section");
      section.parentNode.removeChild(section);
    }
  });
}

function scrollToPaymentGatewayHeader() {
  const paymentGateway = document.querySelector(".payment-gateway-header");
  paymentGateway.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Start Showing Congrats PopUp

function ShowCongratsPopUp() {
  let congratspopup = document.createElement("section");

  congratspopup.innerHTML = `
    <div class="popup-outer">
      <div class="popup-box congratz-popup-box">
        <img src="./assets/imgs/congrats.png" alt="">
        <h2>Congratulations</h2>
        <p>You have successfully mode rent</p>
        <button class="ok">Ok</button>
      </div>
    </div>
  `;
  document
    .querySelector("header")
    .insertAdjacentElement("afterend", congratspopup);

  // ========= Click on payment Button =========

  let okPopup = document.querySelector("section .ok");

  okPopup.addEventListener("click", (e) => {
    e.preventDefault();
    let section = document.querySelector("section");
    section.parentNode.removeChild(section);
  });

  // ========== Clicking on popup-outer to close the popup ==========

  let closePopup = document.querySelector("section .popup-outer");

  closePopup.addEventListener("click", (event) => {
    const popupBox = document.querySelector(".popup-box");
    const targetElement = event.target;

    if (!popupBox.contains(targetElement)) {
      // Remove the section from the DOM
      let section = document.querySelector("section");
      section.parentNode.removeChild(section);
    }
  });
}

// End Showing Congrats PopUp
