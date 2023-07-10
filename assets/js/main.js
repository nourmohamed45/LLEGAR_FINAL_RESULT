// ======================= Start Header Section =======================

//================ Move to Features Section ================

let featureLink = document.querySelector("header nav .features");

featureLink.addEventListener("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    window.location.href = "index.html#Features";
  }, 100);
});

//================ Move to Team Section ================

let teamLink = document.querySelector("header nav .team");

teamLink.addEventListener("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    window.location.href = "index.html#team";
  }, 100);
});

//================ Move to about Section ================

let aboutLink = document.querySelector("header nav .about");

aboutLink.addEventListener("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    window.location.href = "index.html#about-us";
  }, 100);
});

//================ Move to add item page ================

let addItemIcon = document.querySelector(".active-header .add-item");

addItemIcon.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "add_item_page.html";
  }, 100);
});

//================ Move to Profile page by Profile DropDown Menu ================

let profileDropDownMenu = document.getElementById("yourProfile");

profileDropDownMenu.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "personal_page.html";
  }, 100);
});

//================ Move to Help center by Profile DropDown Menu ================

let helpCenterDropDownMenu = document.getElementById("helpCenter");

helpCenterDropDownMenu.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "help_center.html";
  }, 100);
});

//======================= Move to Edit Location by Profile DropDown Menu =======================

let editLocationDropDownMenu = document.getElementById("editLocation");

editLocationDropDownMenu.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "edit_location.html";
  }, 100);
});

//======================= Start Edit Location =======================

//================ Move to My Items by Profile DropDown Menu ================

let myItemsDropDownMenu = document.getElementById("myItems");

myItemsDropDownMenu.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "my_added_items.html";
  }, 100);
});

//================ Move to Items I Had Rented by Profile DropDown Menu ================

let rentedItemsDropDownMenu = document.getElementById("ItemsIRented");

rentedItemsDropDownMenu.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "items_i_had_rented.html";
  }, 100);
});

//================ Move to Items I Had Rented by Profile DropDown Menu ================

let clientRentedItemsDropDownMenu = document.getElementById("clientRented");

clientRentedItemsDropDownMenu.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "my_rented_items.html";
  }, 100);
});

//================ Show Profile PopUp ================
let dropDownProfile = document.getElementById("dropdownProfile");
let profileImage = document.querySelector(".active-header .profile .image");
let myActivities = document.getElementById("myActivities");
let subActivities = document.querySelector("#myActivities .subactivity");
// Show popUp when click profile image
profileImage.addEventListener("click", () => {
  dropDownProfile.classList.toggle("profile-active");
});

// Show Activities when click profile image
myActivities.addEventListener("click", () => {
  subActivities.classList.toggle("subactivity-active");
});
// hiddin PopUp when click on onother area page
window.addEventListener("click", (event) => {
  if (
    !event.target.matches(
      ".active-header .profile img, #dropdownProfile, #dropdownProfile *"
    )
  ) {
    dropDownProfile.classList.remove("profile-active");
  }
});

// ============ Add User Image ============
let userImage = document.querySelector(".active-header  .profile .image");
let userGender = localStorage.getItem("gender");
let getUserImage = localStorage.getItem("image");

addingImage();

function addingImage() {
  if (getUserImage === "") {
    if (userGender === "male") {
      let maleImage = document.createElement("img");
      maleImage.src = "assets/imgs/Person/man_default_image.png";
      userImage.appendChild(maleImage);
    } else {
      let FemaleImage = document.createElement("img");
      FemaleImage.src = "assets/imgs/Person/women_default_image.png";
      userImage.appendChild(FemaleImage);
    }
  } else {
    // ===================================
    // ========== Api Code Here ==========
    // ===================================
    let newUserImage = document.createElement("img");
    newUserImage.src = "assets/imgs/Person/Nour_logo.jpg"; //========== this line ============
    userImage.appendChild(newUserImage);
  }
}

// ========== show Active User ===========

let signupLoginBtns = document.querySelector("header .container .btns");
let activeHeader = document.querySelector("header .container .active-header");
let nameOfUser = document.querySelector(
  "header .container .active-header .profile .name"
);
let emailOfUser = document.querySelector(
  "header .container .active-header .profile .email"
);

// Check if database has value or not
if (localStorage.getItem("username")) {
  // Delete sign up and login section
  signupLoginBtns.remove();
  // set user name and email in user profile popup
  nameOfUser.innerHTML = localStorage.getItem("username");
  emailOfUser.innerHTML = localStorage.getItem("email");
} else {
  // if database is empty we it will show non-active landing page
  activeHeader.style.display = "none";
}

//============ Move To Favourite Page ============
let favBtn = document.querySelector(".active-header .favorite");

favBtn.addEventListener("click", moveToFav);

function moveToFav() {
  window.location = "wishlist.html";
}

//============ Show orders Page ============

let ordersBtnLink = document.getElementById("orders");

ordersBtnLink.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "my_orders.html";
  }, 100);
});

//============ LogOut ============
let signOut = document.getElementById("signOut");

signOut.addEventListener("click", () => {
  localStorage.clear();
  spinner.style.display = "flex";
  setTimeout(() => {
    window.location = "login.html";
    spinner.style.display = "none";
  }, 2000);
});

//======================= End Header Section =======================

//============================= Start Footer ============================

//======================= Start About Us Policy =======================

let aboutUsFooter = document.querySelector("footer .box .about-us");

aboutUsFooter.addEventListener("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    window.location.href = "index.html#about-us";
  }, 100);
});

//======================= Start Privacy Policy =======================

let privacyPolicy = document.getElementById("privacyPolicy");

privacyPolicy.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "privacy_policy.html";
  }, 100);
});

//======================= End Privacy Policy =======================

//======================= Start Help Center =======================

let helpCenter = document.querySelector(".help-us");

helpCenter.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "help_center.html";
  }, 100);
});

//======================= End Help Center =======================

let contactUs = document.querySelector(".contact-Us");

contactUs.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "contact_us.html";
  }, 100);
});

//============================= End Footer ============================

// ==================== Start Create a Message Box ====================

// =================================================================================================
// =============== Create the main message box container ===============
// =================================================================================================

if (localStorage.getItem("email")) {
  function generateMainMessageBox() {
    let mainMessageBox = document.createElement("div");
    mainMessageBox.classList.add("message-box", "main");

    mainMessageBox.innerHTML = `
      <div class="message-header">
        <h3>Messages</h3>
        <i class="fa-solid fa-angle-up"></i>
      </div>
      <div class="right-body">
        <div class="search-bar">
          <input type="text" class="search-input" placeholder="Search...">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="users">
          <div class="user">
            <div class="user-right">
              <img src="./assets/imgs/Person/Ahmed_Fared.jpg" alt="This image Not found">
              <div class="mid">
                <span class="user-name">Ahmed Fared</span>
                <span class="final-message">Hello.</span>
              </div>
            </div>
            <div class="three-dots">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(mainMessageBox);
  }

  generateMainMessageBox();

  // =================================================================================================
  // =============== Generat the Sub-Main message box container ===============
  // =================================================================================================

  let messageBoxUsers = document.querySelectorAll(
    ".main .right-body .users .user"
  );
  messageBoxUsers.forEach((user) => {
    user.addEventListener("click", () => {
      let SubmainMessageBox = document.createElement("div");
      SubmainMessageBox.classList.add("message-box", "sub-main");

      SubmainMessageBox.innerHTML = `
        <div class="message-header the-user-name">
          <h3>Ahmed Fared</h3>
          <i onclick="removeSubMain()" class="fa-regular fa-circle-xmark"></i>
        </div>
        <div class="left-body">
          <div class="messages-container">
            <div class="my-messages">
              <div class="message">
                <div class="text">Hello</div>
                <div class="time">03:12</div>
              </div>
            </div>
            <div class="others-messages">
              <div class="message">
                <div class="text">Hello.</div>
                <div class="time">03:13</div>
              </div>
            </div>
            
          </div>
          <div class="message-box-footer">
            <input type="text" placeholder="Message">
            <i class="fa-solid fa-paper-plane"></i>
          </div>
        </div>
      `;

      document.body.appendChild(SubmainMessageBox);

      let inputMessage = SubmainMessageBox.querySelector(
        ".message-box-footer input"
      );
      let messageContainer = SubmainMessageBox.querySelector(
        ".messages-container"
      );

      let sendMessage = () => {
        let currentTime = new Date();
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let formattedTime = `${hours}:${minutes}`;
        let message = inputMessage.value;
        inputMessage.value = "";
        let myMessage = document.createElement("div");
        myMessage.classList.add("my-messages");
        myMessage.innerHTML = `
          <div class="message">
            <div class="text">${message}</div>
            <div class="time">${formattedTime}</div>
          </div>
        `;
        messageContainer.appendChild(myMessage);
      };

      SubmainMessageBox.querySelector(
        ".message-box-footer .fa-paper-plane"
      ).addEventListener("click", () => {
        sendMessage();
      });
      inputMessage.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
          // Enter key
          sendMessage();
        }
      });
    });
  });

  // ==================== End Create a Message Box ====================

  // ============= hidden message box =============
  let messageBoxMain = document.querySelector(".message-box.main");
  let messageMainHeader = document.querySelector(
    ".message-box .message-header"
  );

  messageMainHeader.addEventListener("click", () => {
    messageBoxMain.classList.toggle("show");
    if (!messageBoxMain.classList.contains("show")) {
      messageBoxMain.style.bottom = "-500px";
    } else {
      messageBoxMain.style.bottom = "0";
    }
  });

  // ============= close Sub Main Message Box =============

  function removeSubMain() {
    let allSubMainMessageBoxes = document.querySelectorAll(".sub-main");
    allSubMainMessageBoxes.forEach((subMain) => {
      subMain.addEventListener("click", () => {
        subMain.closest(".sub-main").remove();
      });
    });
  }
}

/* ==================================== Start Popup ==================================== */

function ShowUserReviewPopUp() {
  let usercommentpopup = document.createElement("section");

  usercommentpopup.innerHTML = `
      <div class="popup-outer">
        <div class="popup-box">
          <h2>Leave Your Comment</h2>
          <div class="popup-user-info">
            <img src="./assets/imgs/Person/Ahmed-Salem.jpg" alt="">
            <div class="popup-user-name">Ahmed Salem</div>
          </div>
          <ul class="filter-star">
            <li data-star=".five"><i class="fa-solid fa-star"></i><div class = "star-num">5</div></li>
            <li data-star=".four"><i class="fa-solid fa-star"></i><div class = "star-num">4</div></li>
            <li data-star=".three"><i class="fa-solid fa-star"></i><div class = "star-num">3</div></li>
            <li data-star=".two"><i class="fa-solid fa-star"></i><div class = "star-num">2</div></li>
            <li data-star=".one"><i class="fa-solid fa-star"></i><div class = "star-num">1</div></li>
            <li data-star=".zero"><i class="fa-solid fa-star"></i><div class = "star-num">0</div></li>
          </ul>
          <form action="#">
            <div class="label">Your Comment</div>
            <textarea placeholder="Write Text Here..."></textarea>
            <div class="popup-leave-user-comment-buttons">
              <button class="apply">Apply</button>
              <button class="cancel">Cancel</button>
            </div>
          </form>
        </div>
      </div>
  `;
  document.body.prepend(usercommentpopup);

  let staruserpopup = document.querySelectorAll(
    "section .popup-outer .popup-box ul li"
  );

  // ========= activation rating button =========
  staruserpopup.forEach(function (li) {
    li.addEventListener("click", function () {
      staruserpopup.forEach(function (li) {
        li.classList.remove("active-star-popup");
      });
      this.classList.add("active-star-popup");
    });
  });

  // ========= Sending User Review function =========

  let sendMessage = () => {
    let userTextReview = document.querySelector(
      "section .popup-outer form textarea"
    ).value;
    let activeStarPopup = false;

    staruserpopup.forEach(function (li) {
      if (li.classList.contains("active-star-popup")) {
        activeStarPopup = true;
      }
    });

    if (userTextReview === "" || !activeStarPopup) {
      alert("Please select");
    } else {
      localStorage.setItem("userTextReview", userTextReview);
      localStorage.setItem(
        "activeStarPopup",
        document.querySelector("li.active-star-popup .star-num").innerHTML
      );

      // Remove the section from the DOM
      let section = document.querySelector("section");
      section.parentNode.removeChild(section);
    }
  };

  // ========= Click on Apply Button =========

  let applyUserReviewPopup = document.querySelector(
    "section .popup-outer form button.apply"
  );

  applyUserReviewPopup.addEventListener("click", (e) => {
    e.preventDefault();
    sendMessage();
  });

  // ========= Click on Cancel Button =========

  let cancelUserReviewPopup = document.querySelector(
    "section .popup-outer form button.cancel"
  );

  cancelUserReviewPopup.addEventListener("click", () => {
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

/* ==================================== End Popup ==================================== */
