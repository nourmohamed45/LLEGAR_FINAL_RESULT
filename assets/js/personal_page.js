let profileName = document.querySelector(".personal-page .right #userName");
let editEmailIcon = document.querySelector(".personal-page .show-email i");
let editEmailInput = document.querySelector(".personal-page .show-email input");
let editLocationIcon = document.querySelector(".personal-page .container .right .rows .user-location .uper i");
let editLocationInput = document.querySelector(".personal-page .container .right .rows .user-location .downer input");
let editPhoneIcon = document.querySelector(".personal-page .container .right .rows .user-phone i");
let editPhoneInput = document.querySelector(".personal-page .container .right .rows .user-phone input");
const regex = /\w+@[a-z]+\.[a-z]{2,3}/;


profileName.innerHTML = localStorage.getItem("fullname")
editEmailInput.value = localStorage.getItem("email");
editLocationInput.value = localStorage.getItem("city");
editPhoneInput.value = localStorage.getItem("phonenumber");

// ============= Edit Profile Photo =============

let fileInput = document.getElementById("file");
let editPhotoBtn = document.getElementById("editPhoto");
let profileImg = document.querySelector(".profile-img");

editPhotoBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  let choosedFile = event.target.files[0];
  if (choosedFile) {
    let reader = new FileReader();

    reader.addEventListener("load", () => {
      profileImg.setAttribute("src", reader.result);
    });
    reader.readAsDataURL(choosedFile);
  }
});

// ============= Edit Email Address =============
editEmailIcon.addEventListener("click", () => {
    editEmailInput.removeAttribute("disabled");
    editEmailInput.focus();
});

editEmailInput.addEventListener("keypress", (event) => {
  if(event.key === "Enter") {
    if(regex.test(editEmailInput.value)) {
      editEmailInput.setAttribute("disabled", "disabled");
      localStorage.setItem("email", editEmailInput.value);
    } else {
      alert("Please enter a valid email");
    }
  }
})


// ============= Edit Location =============

editLocationIcon.addEventListener("click", () => {
    editLocationInput.removeAttribute("disabled");
    editLocationInput.focus();
});

editLocationInput.addEventListener("keypress", (event) => {
  if(event.key === "Enter") {
    editLocationInput.setAttribute("disabled", "disabled");
    localStorage.setItem("city", editLocationInput.value);
  }
});

// ============= Edit Phone Number =============

editPhoneIcon.addEventListener("click", () => {
    editPhoneInput.removeAttribute("disabled");
    editPhoneInput.focus();
});

editPhoneInput.addEventListener("keypress", (event) => {
  if(event.key === "Enter") {
    if(!isNaN(editPhoneInput.value)) {
      editPhoneInput.setAttribute("disabled", "disabled");
      localStorage.setItem("phonenumber", editPhoneInput.value);
    } else {
      alert("Please enter a phone number");
    }
  }
});