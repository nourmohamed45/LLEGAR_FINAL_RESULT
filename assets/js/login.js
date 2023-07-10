let email = document.getElementById("email");
let password = document.getElementById("password");
let signInBtn = document.getElementById("signIn");
let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");
let remember = document.getElementById("remember");
let mail = document.getElementById("email");
let pass = document.getElementById("pass");
let spinner = document.querySelector(".spinner__container");

// email regex
let regex = /\w+@[a-z]+\.[a-z]{2,3}/;

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // check empty field
  
  if (email.value === "" || password.value === "") {
    alert("Please Fill Data");
  } else {
    // check email regex
    if (!regex.test(email.value)) {
      alert("please Enter Valid Email");
    } else if (password.value.length < 8) {
      alert("Please Enter Password with at least 8 character");
    } else if (
      getEmail &&
      email.value.trim() === getEmail.trim() &&
      getPassword &&
      password.value === getPassword
    ) {

    } else {
      spinner.style.display = "flex";
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
    
      var raw = JSON.stringify({
        email: email.value,
        password: password.value,
      });
    
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
    
      fetch(
        "https://llegar-project-x0wv.onrender.com/api/v1/users/login",
        requestOptions
      ).
      then(function(response) {
        spinner.style.display = "none";
        return response.json();
      })
      .then((result) => {
        if (result.status === "success") {
          window.location = "index.html";
          console.log(result.data.user)
          localStorage.setItem("JWT", result.token);
          localStorage.setItem("username", result.data?.user?.userName);
          localStorage.setItem("email",  result.data?.user?.email);
          localStorage.setItem("fullname", result.data.user.fullName);
          localStorage.setItem("address", result.data.user.location.address);
          localStorage.setItem("phonenumber", result.data.user.phoneNumber);
          localStorage.setItem("city",  result.data.user.city );
          localStorage.setItem("gender", result.data.user.gender );
        } else {
          alert(result.message);
        }
      });
    
    
    }
  }
});

rememberMe();

// Remember Me function

function rememberMe() {
  remember.addEventListener("click", () => {
    if (email.value !== "" && password.value !== "") {
      if (!regex.test(email.value)) {
        alert("Please Enter Valid Email");
      } else if (password.value.length < 8) {
        alert("Please Enter Password with at least 8 characters");
      } else {
        let prevState = remember.classList.contains("active");
        remember.classList.toggle("active");
        if (remember.classList.contains("active")) {
          localStorage.setItem("pass", pass.value);
          localStorage.setItem("mail", mail.value);
        } else {
          localStorage.removeItem("pass");
          localStorage.removeItem("mail");
        }
        if (prevState !== remember.classList.contains("active")) {
          console.log("Checkbox state changed");
          remember.classList.remove("active");
        } else {
          remember.classList.add("active");
          console.log("Checkbox state unchanged");
        }
      }
    } else {
      localStorage.removeItem("pass");
      localStorage.removeItem("mail");
      alert(
        "Fill Data Before Asking Remember and Reset remember Value Checked"
      );
    }
  });
}


// ======== showing password confirmation ========

let passwordInput = document.getElementById("password");
let togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  let type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  
  togglePassword.classList.toggle("fa-eye-slash");
  togglePassword.classList.toggle("fa-eye");
});


// Forget Password

let forgetBtn = document.querySelector(".forget");

forgetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  setTimeout(() => {
    window.location = "forget_pass.html";
  }, 1000);
});