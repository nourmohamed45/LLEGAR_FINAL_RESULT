let inputs = document.querySelectorAll("input");
let submitVerification = document.getElementById("submit-verification");
let spinner = document.querySelector(".spinner__container");

const inputElements = [...document.querySelectorAll("input")];
window.addEventListener("load", () => {
  inputs[0].focus();
});

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    let currentInput = input;
    let nextInput = input.nextElementSibling;

    if (currentInput.value.length > 1) {
      currentInput.value = currentInput.value.slice(1);
    }

    if (
      nextInput !== null &&
      nextInput.hasAttribute("disabled") &&
      currentInput.value !== ""
    ) {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    input.addEventListener("keyup", (e) => {
      if (e.key === "Backspace") {
        if (input.previousElementSibling !== null) {
          e.target.value = "";
          e.target.setAttribute("disabled", true);
          input.previousElementSibling.focus();
        }
      }
    });
  });
});

//handel submit Verification
submitVerification.addEventListener("click", function (e) {
  e.preventDefault();
  const code = inputElements.map(({ value }) => value).join("");
  const Jwt = localStorage.getItem("JWT");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${Jwt}`);
  myHeaders.append("Cookie", `jwt=${Jwt}`);


  if (code.length === 4) {
    spinner.style.display = "flex";
    var raw = JSON.stringify({
      resetCode: code,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://llegar-project-x0wv.onrender.com/api/v1/users/verfiyPassword",
      requestOptions
    ).
    then(function(response) {
      spinner.style.display = "none";
      return response.json();
    })
    .then((result) => {
      
      if (result.status === "success") {
        localStorage.setItem("JWT", result.token);
        window.location = "new_pass.html";
      } else {
        alert(result.message);
      }
    })
  
  }
});
