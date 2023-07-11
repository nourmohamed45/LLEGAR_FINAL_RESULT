//======================= Start Showing Details =======================

import { request } from "./service/index.mjs";
//selectors
let spinner = document.querySelector(".spinner__container");
let othersBtn = document.getElementById("seeHisPage");

// othersBtn.addEventListener("click", () => {
//   setTimeout(() => {
//     window.location.href = "others_person_page.html";
//   }, 100);
// });

// === Move to payment page ===

let purchaseBtn = document.querySelector(
  "#itemDetails .container .time-and-bell .bell .purchase-btn .button"
);
// let handelPurchaseBtn = () =>{
//    window.location.href = "payment_page.html";
// }
purchaseBtn.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "payment_page.html";
  }, 100);
});

// Condition Checkbox

const conditionCheckbox = document.getElementById("condition");

// conditionCheckbox.addEventListener("change", () => {
//   if (conditionCheckbox.checked) {
//     conditionCheckbox.setAttribute("checked", "checked");
//   } else {
//     conditionCheckbox.removeAttribute("checked");
//   }
// });

//======================= End Showing Details =======================

//======================= Start Show More Photos =======================

let loadMoreBtn = document.querySelector("#loadMore");
let currentItem = 3;

// loadMoreBtn.onclick = () => {
//   let boxes = [
//     ...document.querySelectorAll("#itemDetails .container .box-container .box"),
//   ];
//   for (let i = currentItem; i < currentItem + 4; i++) {
//     boxes[i].style.display = "inline-block";
//   }
//   currentItem += 3;
//   if (currentItem >= boxes.length) {
//     loadMoreBtn.style.display = "none";
//     loadMoreBtn.style.backgroundColor = "var(--main-color)";
//   }
// };

//=======================  Show details items =======================
let itemContainer = document.querySelector(
  "#itemDetails .container .details-item"
);
function generateItem(id = "64a74370e67c6d0054a98bf7") {
  (async function getReviewsOnItem() {
    try {
      spinner.style.display = "flex";
      const response = await request({
        url: `/items/${id}`,
      });
      spinner.style.display = "none";
      console.log(response, "response");
      let item = response?.data?.doc;

      let itemUI = `
        <div class="owner-container">
        <div class="owner">
          <div class="info">
            <img src="assets/imgs//Person/Ahmed-Salem.jpg" alt="">
            <div class="name-and-date">
              <div class="name">${item.Owner.userName}</div>
              <div class="date"><span class="num">2</span> <span>minutes ago</span></div>
            </div>
          </div>
        </div>
        <div class="owner-btn">
          <a href= "others_person_page.html"><button onclick="showOtherUserPage()" id="seeHisPage" type="button">See His Page</button></a>
          <button onclick="ShowUserReviewPopUp()" id="LeaveYourReview" type="button">Leave Your Review</button>
        </div>
      </div>
      <div id="itemTitle" class="container">
        <div id="itemTitleDetails" class="main-title">
          <div class="text-header">
            <h2 class="title top">${item.title}</h2>
            <div class="mid">${item.city}</span>, <span class="location">${
        item.location.address
      }</span></div>
            <div class="footer"><span class="star"><i class="fa-solid fa-star"></i></span> <span class="rate">0.0</span> (<span class="reviews">0</span> Reviews) <span class="available">${
              item.availablity === true ? "Available" : "Not Available"
            }</span></div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="box-container">
          <div class="box">
            <div class="image">
              <img src="assets/imgs/Card_Images/car/mercedes1.jpg" alt="">
            </div>
          </div>
          <div class="box">
            <div class="image">
              <img src="assets/imgs/Card_Images/car/mercedes2.jpg" alt="">
            </div>
          </div>
          <div class="box">
            <div class="image">
              <img src="assets/imgs/Card_Images/car/mercedes3.jpg" alt="">
            </div>
          </div>
          <div class="box">
            <div class="image">
              <img src="assets/imgs/Card_Images/car/mercedes4.jpg" alt="">
            </div>
          </div>
          <div class="box">
            <div class="image">
              <img src="assets/imgs/Card_Images/car/mercedes5.jpg" alt="">
            </div>
          </div>
          
        </div>
        <div id="loadMore">Show All</div>
      </div>

      <div id="discription" class="container">
        <div id="descTitle" class="main-title">
          <h1>Description</h1>
        </div>
        <p>${item.description}</p>
      </div>
      <div class="condition">
        <input id="condition" type="checkbox">
        <label for="condition">The client agrees to maintain the property in its original condition and to take reasonable care of it during the rental period. Any malicious or intentional damage to the property will result in additional charges. These charges include, but are not limited to, the cost of repairs or replacement of damaged items, legal fees, and insurance.</label>
      </div>
      <div id="location" class="container">
        <div id="descTitle" class="main-title">
          <h1>Location</h1>
        </div>
        <div class="location-field">
        ${item.city}
        </div>
      </div>
      <div id="descTitle" class="main-title">
        <h1>Shipping</h1>
      </div>
      <div class="location-box">
        <div class="loc-icon">
          <i class="fa-solid fa-location-dot"></i>
        </div>
        <div class="mid">
          <div>
            <h3>Home</h3>
          </div>
          <p>${item.location.address}</p>
        </div>
      </div>
      
    </div>
      </div>
        `;
        
      if (response.status === "success") {
        itemContainer.innerHTML = itemUI;
      } else {
        itemContainer.innerHTML = `<span>${response.data.message}</span>`;
      }
    } catch (err) {
      itemContainer.innerHTML = `<span>${err.message}</span>`;
    }
  })();
}

generateItem(localStorage.getItem("itemID"));

//======================= Start Generation of Items Reviews Section =======================

let itemsReviewContainer = document.querySelector(
  "#itemDetails .container .review-comment"
);

function generateItemsReview(id = "64a74370e67c6d0054a98bf7") {
  (async function getOnItem() {
    try {
      spinner.style.display = "flex";
      const response = await request({
        url: `/items/${id}/reviews`,
      });
      spinner.style.display = "none";

      let reviews = response?.data?.data;

      let itemReviewtUI = reviews.map((item, index) => {
        if (Number(item.ratingNumber) < 5 && Number(item.ratingNumber) > 0) {
          item.itemStar = `<i class="fa-solid fa-star-half-stroke"></i>`;
        } else if (Number(item.ratingNumber) === 5) {
          item.itemStar = `<i class="fa-solid fa-star"></i>`;
        } else {
          item.itemStar = `<i class="fa-regular fa-star"></i>`;
        }

        if (Number(item.ratingNumber) <= 5 && item.ratingNumber >= 4.5) {
          item.ratingClass = "five";
        } else if (
          Number(item.ratingNumber) < 4.5 &&
          item.ratingNumber >= 3.5
        ) {
          item.ratingClass = "four";
        } else if (
          Number(item.ratingNumber) < 3.5 &&
          item.ratingNumber >= 2.5
        ) {
          item.ratingClass = "three";
        } else if (
          Number(item.ratingNumber) < 2.5 &&
          item.ratingNumber >= 1.5
        ) {
          item.ratingClass = "two";
        } else if (
          Number(item.ratingNumber) < 1.5 &&
          item.ratingNumber >= 0.5
        ) {
          item.ratingClass = "one";
        } else if (
          Number(item.ratingNumber) < 0.5 &&
          item.ratingNumber >= 0.0
        ) {
          item.ratingClass = "zero";
        }
        const days = new Date(item.createdAt).getDay();
        return `
        <div class="all comment ${item.ratingClass}">
          <div class="head">
            <div class="image-and-name">
              <div class="image">
                <img src="./assets/imgs/Person/Khaled-Atef.jfif" alt="There Is Not Image Found">
              </div>
              <div class="name">
                <h3 class="name">${item.user?.userName || "unknown"}</h3>
              </div>
            </div>
            <div class="review">
              ${item.itemStar}
              <span class="num">${item.rating}</span>
            </div>
          </div>
          <div class="middle">
            <p class="comment-descroption">${item.comment}</p>
          </div>
          <div class="footer">
            <div class="right">
              <i class="fa-solid fa-heart"></i>
              <span class="number-of-heart">34</span>
            </div>
            <div class="click-to-love">
              <i class="fa-regular fa-heart"></i>
              <span class="">Click to love</span>
            </div>
            <div class="left">
              <span class="number-of-date-ago">${
                days === 0 ? "today" : days
              }</span>
              <span class="date-text">${days === 0 ? "" : "days ago"}</span>
            </div>
          </div>
        </div>
        `;
      });
      itemsReviewContainer.innerHTML = itemReviewtUI.join("");
    } catch (err) {
      console.error(err);
    }
  })();
}

generateItemsReview(localStorage.getItem("itemID"));

//======================= End Generation of Items Reviews Section =======================

//======================= Start Rating Filter Section =======================

let star = document.querySelectorAll(
  "#itemDetails .container .filter-review-bar li"
);
let comment = Array.from(
  document.querySelectorAll("#itemDetails .container .review-comment .all")
);

star.forEach(function (li) {
  li.addEventListener("click", function () {
    star.forEach(function (li) {
      li.classList.remove("active");
    });
    this.classList.add("active");
    comment.forEach((li) => {
      li.style.display = "none";
    });
    document.querySelectorAll(this.dataset.star).forEach((li) => {
      li.style.display = "block";
    });
  });
});

//======================= End Rating Filter Section =======================

//======================= Start click to love action =======================

let commentBox = document.querySelectorAll(" .comment");
let clickToLoveBtn = document.querySelectorAll(
  " .comment .footer .click-to-love"
);
let clickToLoveIcon = document.querySelectorAll(
  " .comment .footer .click-to-love i"
);
let loveSpanIncrement = document.querySelectorAll(
  " .comment .footer .right span"
);

clickToLoveBtn.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    if (this.classList.contains("active")) {
      this.classList.remove("active");
      loveSpanIncrement[index].innerHTML--;
      clickToLoveIcon[index].classList.remove("fa-solid");
      clickToLoveIcon[index].classList.add("fa-regular");
    } else {
      this.classList.add("active");
      loveSpanIncrement[index].innerHTML++;
      clickToLoveIcon[index].classList.remove("fa-regular");
      clickToLoveIcon[index].classList.add("fa-solid");
    }
  });
});

//======================= End click to love action =======================

//======================= Start Add Item Review =======================

let leaveItemReviewBtn = document.getElementById("leaveItemReview");

leaveItemReviewBtn.addEventListener("click", () => {
  showItemReviewPopUp();
  scrollToReviewsFilter();
});

function scrollToReviewsFilter() {
  const reviewsFilter = document.querySelector(".reviews-filter");
  reviewsFilter.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showItemReviewPopUp() {
  let itemcommentpopup = document.createElement("section");
  itemcommentpopup.style.position = "absolute";
  itemcommentpopup.style.left = "0";
  itemcommentpopup.style.height = "100%";
  itemcommentpopup.innerHTML = `
    <div class="popup-outer">
      <div class="popup-box">
        <h2>Leave Your Comment</h2>
        <ul class="filter-star item-review-star">
          <li data-star=".five"><i class="fa-solid fa-star"></i><div class = "star-num">5</div></li>
          <li data-star=".four"><i class="fa-solid fa-star"></i><div class = "star-num">4</div></li>
          <li data-star=".three"><i class="fa-solid fa-star"></i><div class = "star-num">3</div></li>
          <li data-star=".two"><i class="fa-solid fa-star"></i><div class = "star-num">2</div></li>
          <li data-star=".one"><i class="fa-solid fa-star"></i><div class = "star-num">1</div></li>
          <li data-star=".zero"><i class="fa-solid fa-star"></i><div class = "star-num">0</div></li>
        </ul>
        <form action="#" class="item-review-form">
          <div class="label">Your Comment</div>
          <textarea placeholder="Write Text Here..."></textarea>
          <div class="popup-leave-user-comment-buttons">
            <button class="apply" style= "color: var(--white-color); background-color: var(--main-color);">Apply</button>
            <button class="cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document
    .querySelector(".time-and-bell")
    .insertAdjacentElement("afterend", itemcommentpopup);

  let starItempopup = document.querySelectorAll(
    "section .popup-outer .popup-box ul li"
  );

  // ========= activation rating button =========
  starItempopup.forEach(function (li) {
    li.addEventListener("click", function () {
      starItempopup.forEach(function (li) {
        li.classList.remove("active-star-popup");
      });
      this.classList.add("active-star-popup");
    });
  });

  // ========= Sending User Review function =========

  let sendMessage = () => {
    let itemTextReview = document.querySelector(
      "section .popup-outer form textarea"
    ).value;
    let activeStarPopup = false;

    starItempopup.forEach(function (li) {
      if (li.classList.contains("active-star-popup")) {
        activeStarPopup = true;
      }
    });

    if (itemTextReview === "" || !activeStarPopup) {
      alert("Please select");
    } else {
      localStorage.setItem("itemTextReview", itemTextReview);
      localStorage.setItem(
        "activeItemStarPopup",
        document.querySelector(
          "ul.item-review-star li.active-star-popup .star-num"
        ).innerHTML
      );

      // Remove the section from the DOM
      let section = document.querySelector("section");
      section.parentNode.removeChild(section);
    }
  };

  // ========= Click on Apply Button =========

  function createMyReview() {
    let itemStar = ``;
    let ratingClass = ``;
    let ratingNumber = "";
    let myItemTextReview = localStorage.getItem("itemTextReview");
    if (
      Number(localStorage.getItem("activeItemStarPopup")) < 5 &&
      Number(localStorage.getItem("activeItemStarPopup")) > 0
    ) {
      itemStar = `<i class="fa-solid fa-star-half-stroke"></i>`;
    } else if (Number(localStorage.getItem("activeItemStarPopup")) === 5) {
      itemStar = `<i class="fa-solid fa-star"></i>`;
    } else {
      itemStar = `<i class="fa-regular fa-star"></i>`;
    }

    if (
      Number(localStorage.getItem("activeItemStarPopup")) <= 5 &&
      Number(localStorage.getItem("activeItemStarPopup")) >= 4.5
    ) {
      ratingClass = "five";
      ratingNumber = "5.0";
    } else if (
      Number(localStorage.getItem("activeItemStarPopup")) < 4.5 &&
      Number(localStorage.getItem("activeItemStarPopup")) >= 3.5
    ) {
      ratingClass = "four";
      ratingNumber = "4.0";
    } else if (
      Number(localStorage.getItem("activeItemStarPopup")) < 3.5 &&
      Number(localStorage.getItem("activeItemStarPopup")) >= 2.5
    ) {
      ratingClass = "three";
      ratingNumber = "3.0";
    } else if (
      Number(localStorage.getItem("activeItemStarPopup")) < 2.5 &&
      Number(localStorage.getItem("activeItemStarPopup")) >= 1.5
    ) {
      ratingClass = "two";
      ratingNumber = "2.0";
    } else if (
      Number(localStorage.getItem("activeItemStarPopup")) < 1.5 &&
      Number(localStorage.getItem("activeItemStarPopup")) >= 0.5
    ) {
      ratingClass = "one";
      ratingNumber = "1.0";
    } else if (
      Number(localStorage.getItem("activeItemStarPopup")) < 0.5 &&
      Number(localStorage.getItem("activeItemStarPopup")) >= 0.0
    ) {
      ratingClass = "zero";
      ratingNumber = "0.0";
    }

    let myReview = `
                  <div class="all comment ${ratingClass}">
                    <div class="head">
                      <div class="image-and-name">
                        <div class="image">
                          <img src="./assets/imgs/Person/Nour_logo.jpg" alt="There Is Not Image Found">
                        </div>
                        <div class="name">
                          <h3 class="name">${localStorage.getItem(
                            "fullname"
                          )}</h3>
                        </div>
                      </div>
                      <div class="review">
                        ${itemStar}
                        <span class="num">${ratingNumber}</span>
                      </div>
                    </div>
                    <div class="middle">
                      <p class="comment-descroption">${myItemTextReview}</p>
                    </div>
                    <div class="footer">
                      <div class="right">
                        <i class="fa-solid fa-heart"></i>
                        <span class="number-of-heart">0</span>
                      </div>
                      <div class="click-to-love">
                        <i class="fa-regular fa-heart"></i>
                        <span class="">Click to love</span>
                      </div>
                      <div class="left">
                        <span class="number-of-date-ago">0</span>
                        <span class="date-text">days ago</span>
                      </div>
                    </div>
                  </div>
                `;

    itemsReviewContainer.insertAdjacentHTML("beforeend", myReview);
  }

  let applyItemReviewPopup = document.querySelector(
    "section .popup-outer form.item-review-form button.apply"
  );

  applyItemReviewPopup.addEventListener("click", (e) => {
    e.preventDefault();
    sendMessage();
    createMyReview();
  });

  // ========= Click on Cancel Button =========

  let cancelItemReviewPopup = document.querySelector(
    "section .popup-outer form.item-review-form button.cancel"
  );

  cancelItemReviewPopup.addEventListener("click", () => {
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

//======================= End Add Item Review =======================
