//======================= Start Landing Page =======================
let spinner = document.querySelector(".spinner__container");
//======================= Start Slider Section =======================
// Get Slider Items
let sliderImages = Array.from(
  document.querySelectorAll(".slider .container .image li img")
);

// Get number of slides
let slidesCount = sliderImages.length;

// Set Current Slide
// let currentSlide = 1;
let currentSlide = 1;

// previous and next buttons
let nextButton = document.querySelector(".slider .container .next");
let prevButton = document.querySelector(".slider .container .prev");

// Handle Click on Prev and next button
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

// Create the main ul element that contains bullets

let indicatorContainer = document.createElement("ul");

// Set ID on Created Ul element
indicatorContainer.setAttribute("id", "indicator-ul");

// Create List Items Based on slides count
for (let i = 0; i < slidesCount; i++) {
  // create the bullet div
  let indicatorElementItem = document.createElement("div");

  // Set Class called bullet
  indicatorElementItem.classList.add("bullet");
  // Set Custom Attibute to allow me slide image when i press bullet
  indicatorElementItem.setAttribute("data-index", i);

  // Append Items to the main ul list
  indicatorContainer.appendChild(indicatorElementItem);
}

// Add the created ul element to page
document
  .querySelector(".slider .container .indicator")
  .appendChild(indicatorContainer);

// Get the ne Created ul
let indicatorCreatedUl = document.getElementById("indicator-ul");

// Get Array Of Bullets
let bulletsArray = Array.from(
  document.querySelectorAll("#indicator-ul .bullet")
);

// Next Slide function
function nextSlide() {
  if (nextButton.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide++;
    theChecker();
  }
}

// Previous Slide function
function prevSlide() {
  if (prevButton.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide--;
    theChecker();
  }
}

if (sliderImages.length < 1) {
} else {
  currentSlide = 1;
  theChecker();
}

// Create the checker function
function theChecker() {
  // Remove All ACtive Classes
  removeAllActive();

  // Set Active Class On Current Slide
  sliderImages[currentSlide - 1].classList.add("active");

  // Set Active class On Current indicator item
  indicatorCreatedUl.children[currentSlide - 1].classList.add("active");

  // check if Current Slide is the First
  if (currentSlide === 1) {
    // Add Disabled Class On Pervious Button
    prevButton.classList.add("disabled");
  } else {
    // Remove Disabled Class From Pervious Button
    prevButton.classList.remove("disabled");
  }

  // check if Current Slide is the Last
  if (currentSlide === slidesCount) {
    // Add Disabled Class On Pervious Button
    nextButton.classList.add("disabled");
  } else {
    // Remove Disabled Class From Pervious Button
    nextButton.classList.remove("disabled");
  }
}

// Remove All Active Classes From Images and indicator bullets
function removeAllActive() {
  // Loop Through Images
  sliderImages.forEach(function (img) {
    img.classList.remove("active");
  });

  // Loop Through Bullets
  bulletsArray.forEach(function (bul) {
    bul.classList.remove("active");
  });
}
//======================= End Slider Section =======================

//======================= UP BTN =======================
let btn = document.querySelector(".up");

window.onscroll = function () {
  if (this.scrollY >= 1000) {
    btn.classList.add("move");
  } else {
    btn.classList.remove("move");
  }
};

btn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


//======================= Start Generate Cards =======================
let cardsContainer = document.querySelector(".card-section #cards");
let favoriteBadge = document.querySelector(
  ".active-header#active-header .favorite div"
);
let favoriteItemsCount = 0;
let products = JSON.parse(localStorage.getItem("products"));
let Jwt = localStorage.getItem("JWT");
spinner.style.display = "flex";
let cardSection = document.querySelector(".card-section .card");
let addId = (id) =>{
  localStorage.setItem("itemID", id);
  window.location = "item_details.html"
}

let generateProduct = () => {

  var requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Jwt}`,
      Cookie: `jwt=${Jwt}`,
    },
    redirect: "follow",
    row: "",
  };
  fetch("https://llegar-project-x0wv.onrender.com/api/v1/items", requestOptions)
    .then((response) => {
      spinner.style.display = "none";
      return response.json();
    })
    .then((res) => {
      if (res.status === "success") {
        let ProductUI = res?.data?.data.map((item) => {
          if (Number(item.ratingsQuantity) <= item.ratingsAverage) {
            item.productStar = `<i class="fa-solid fa-star-half-stroke"></i>`;
          } else if (item.ratingsQuantity === item.ratingsQuantity) {
            item.productStar = `<i class="fa-solid fa-star"></i>`;
          } else {
            item.productStar = `<i class="fa-regular fa-star"></i>`;
          }
          return `
          <div class="all card ${item.title} onclick=\"addId('${item.id}')\" ">
            <div class="img">
              <div class="fav" id ="item-${item.id}">
              <i class="fa-solid fa-heart" ></i>
              </div>
              <div class="card-image">
                <img src="assets/imgs/Card_Images/main2.jfif" alt="">
              </div>
            </div>
            <a onclick="saveItemData(${item.id})" class="details">
              <div class="top">
                <div class="title">
                  <span class="subCat">${item.title}</span>, <span class="location">${item.city}</span>
                </div>
                <div class="rate">
                  ${item.productStar}
                  <span>${item.ratingsQuantity}</span>
                </div>
              </div>
              <div class="mid">
                <p class="desc">${item.description}</p>
              </div>
              <div class="bottom">
                <div class="price"><span>$</span><span class="number">${item.pricePerDay} </span>/day</div> 
              </div>
            </a>
          </div>
        `;
        });

        cardsContainer.innerHTML = ProductUI.slice(0, 4).join("");
      } else {

        cardsContainer.innerHTML = `<span>${res.message}</span>`;
      }
    });
};

generateProduct();

//================ Start Search Bar ================

let filterArray = [];
let searchBar = document.getElementById("search");

// Live searching using keyup input

searchBar.addEventListener("keyup", (event) => {
  let text = searchBar.value;
  filterArray = product.filter((item) => {
    if (item.productSubCat.includes(text)) {
      return item.productSubCat;
    }
  });
  if (this.value == "") {
    generateProduct(product);
  } else {
    if (filterArray == "") {
      cardsContainer.innerHTML = "";
    } else {
      generateProduct(filterArray);
    }
  }
});

//================ End Search Bar ================

//================ Move to items page ================

let itemPageBtn = document.querySelector("#ItemsPageBtn button");

itemPageBtn.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "items_page.html";
  }, 100);
});

//======================= Start Filter Section =======================

let cat = document.querySelectorAll(".card-section .container ul li");
let card = Array.from(
  document.querySelectorAll(".card-section .container .cards .all")
);

cat.forEach(function (li) {
  li.addEventListener("click", function () {
    cat.forEach(function (li) {
      li.classList.remove("active");
    });
    this.classList.add("active");
    card.forEach((li) => {
      li.style.display = "none";
    });
    document.querySelectorAll(this.dataset.cat).forEach((li) => {
      li.style.display = "block";
    });
  });
});

//======================= End Filter Section =======================
//======================= End Landing Page =======================

//======== Start Add To Favorite ========

// Check If there is items in LocalStorage
let addedItem = localStorage.getItem("productInFavorite")
  ? JSON.parse(localStorage.getItem("productInFavorite"))
  : [];

if (addedItem) {
  addedItem.forEach((item) => {
    let favContainerElement = document.querySelector(`#item-${item.id}`);
    if (favContainerElement) {
      favContainerElement.classList.add("active");
      let favIconElement = favContainerElement.querySelector(".fa-heart");
      favIconElement.classList.add("main-color");
      favoriteBadge.innerHTML = addedItem.length;
      favoriteBadge.style.display = "block";
    }
    favoriteItemsCount = addedItem.length;
  });
}

// Add To Favorite
function addedToFavorite(id) {
  // Check if user has account or not when he click on favorite card
  if (localStorage.getItem("username")) {
    // =================== Api ===================
    let favcontainer = document.querySelector(`#item-${id}`);
    let isActive = favcontainer.classList.contains("active");
    let favicon = document.querySelector(`#item-${id} .fa-heart`);
    let ChoosenItem = product.find((item) => item.id === id);

    addedItem = [...addedItem, ChoosenItem];
    favicon.style.color = "";
    if (!isActive) {
      localStorage.setItem("productInFavorite", JSON.stringify(addedItem));
      favcontainer.classList.add("active");
      favicon.classList.add("main-color");
      favoriteItemsCount++;
      favoriteBadge.style.display = "block";
    } else {
      let storedItems = JSON.parse(localStorage.getItem("productInFavorite"));
      let index = storedItems.findIndex((item) => item.id === id);
      storedItems.splice(index, 1);
      addedItem = storedItems;
      localStorage.setItem("productInFavorite", JSON.stringify(addedItem));
      favcontainer.classList.remove("active");
      favicon.classList.remove("main-color");
      favicon.style.color = "";
      favoriteItemsCount--;
      if (favoriteItemsCount === 0) {
        favoriteBadge.style.display = "none";
        localStorage.removeItem("productInFavorite");
      }
    }

    // Update the favorite badge count
    favoriteBadge.textContent = favoriteItemsCount;
  } else {
    window.location = "login.html";
  }

  // Save the favorite items count to local storage
  // localStorage.setItem("favoriteItemsCount", favoriteItemsCount); =================== Api =====================
}

//======== End Add To Favorite ========

//======================= End Generate Cards =======================
