// ======== Start showing password confirmation ========

const passwordInputs = document.querySelectorAll(".password");
const togglePasswords = document.querySelectorAll("#togglePassword");
let spinner = document.querySelector(".spinner__container");

togglePasswords.forEach((toggle, index) => {
  toggle.addEventListener("click", () => {
    const type =
      passwordInputs[index].getAttribute("type") === "password"
        ? "text"
        : "password";
    passwordInputs[index].setAttribute("type", type);

    toggle.classList.toggle("fa-eye-slash");
    toggle.classList.toggle("fa-eye");
  });
});

// ======== End showing password confirmation ========

// Create a new password

const generateBtn = document.querySelector(".gen-new-pass");
let newPasswordInput = document.getElementById("newPassword");

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (newPasswordInput.value ) {
    const Jwt = localStorage.getItem("JWT");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Jwt}`);
    myHeaders.append("Cookie", `jwt=${Jwt}`);
    spinner.style.display = "flex"
      var raw = JSON.stringify({
        password: newPasswordInput.value ,
      });
      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://llegar-project-x0wv.onrender.com/api/v1/users/resetPassword",
        requestOptions
      )
        .then(function (response) {
          spinner.style.display = "none";
          return response.json();
        })
        .then((result) => {
          if (result.status === "success") {
            window.location = "login.html";
          } else {
            alert(result.message);
          }
        });

  }
});
