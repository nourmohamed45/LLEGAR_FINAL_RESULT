// Regester User

let userName = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let fullName = document.getElementById("fullName");
let address = document.getElementById("address");
let phoneNumber = document.getElementById("phone");
let city = document.getElementById("country");
let role = document.getElementById("role");
let date = document.getElementById("date");
let gender = document.getElementById("gender");
let image = document.getElementById("image");
let signUpBtn = document.getElementById("sign-up");
let spinner = document.querySelector(".spinner__container");
// localStorage.clear();

// sign up clicked
signUpBtn.addEventListener("click", function (e) {
  // email regex
  e.preventDefault();
  const regex = /\w+@[a-z]+\.[a-z]{2,3}/;

  // check empty field
  if (
    userName.value === "" ||
    email.value === "" ||
    password.value === "" ||
    fullName.value === "" ||
    address.value === "" ||
    phoneNumber.value === ""
  ) {
    alert("Please Fill Data");
  } else {
    // check email regex
    if (!regex.test(email.value)) {
      alert("please Enter Valid Email");
    } else if (password.value.length < 8) {
      alert("Please Enter Password with at least 8 character");
    } else if (isNaN(phoneNumber.value)) {
      alert("please Enter Only Number In Phone Number");
    } else {
      // save inputs values
      localStorage.setItem("username", userName.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("fullname", fullName.value);
      localStorage.setItem("address", address.value);
      localStorage.setItem("phonenumber", phoneNumber.value);
      localStorage.setItem("city", city.value);
      localStorage.setItem("gender", gender.value);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      spinner.style.display = "flex";
      var raw = JSON.stringify({
        userName: userName.value,
        email: email.value,
        password: password.value,
        fullName: fullName.value,
        city: city.value,
        phoneNumber: "+2" + phoneNumber.value,
        gender: gender.value,
        birthDate: date.value,
        location: {
          coordinates: [-80.185942, 25.774772],
          address: address.value,
        },
        role: role.value,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://llegar-project-x0wv.onrender.com/api/v1/users/signup",
        requestOptions
      )
        .then(function (response) {
          spinner.style.display = "none";
          return response.json();
        })
        .then((result) => {
          if (result.status === "success") {
            window.location = "verification_code.html";
            localStorage.setItem("JWT", result.token);
          } else {
            alert(result.message);
            console.log(result);
          }
        })
        .catch((error) => {
          alert(result.message);
        });
    }
  }
});

// ======== showing password confirmation ========

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  togglePassword.classList.toggle("fa-eye-slash");
  togglePassword.classList.toggle("fa-eye");
});
