//======================= Start Adding cards =======================

//======================= Start Generate Cards =======================
let cardsContainer = document.querySelector(".card-section #cards");
let favoriteBadge = document.querySelector(".active-header#active-header .favorite div");
let favoriteItemsCount = 0;
let products = JSON.parse(localStorage.getItem("products"));
let spinner = document.querySelector(".spinner__container");

let Jwt = localStorage.getItem("JWT");
let addId = (id) =>{
  localStorage.setItem("itemID", id);
  window.location = "item_details.html"
}
let generateProduct = () => {
  spinner.style.display = "flex";

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
      return response.json();
    })
    .then((res) => {
      if (res.status === "success") {
        spinner.style.display = "none";

        let ProductUI = res?.data?.data.map((item) => {
          if (
            Number(item.ratingsQuantity) <= item.ratingsAverage 
          ) {
            item.productStar = `<i class="fa-solid fa-star-half-stroke"></i>`;
          } else if (item.ratingsQuantity === item.ratingsQuantity) {
            item.productStar = `<i class="fa-solid fa-star"></i>`;
          } else {
            item.productStar = `<i class="fa-regular fa-star"></i>`;
          }
          return `
          <div class="all card ${item.title}" onclick=\"addId('${item.id}')\">
          <div class="img">
            <div class="fav" id ="item-${item.id}">
              <i class="fa-solid fa-heart" onclick = "addedToFavorite(${item.id})"></i>
            </div>
            <div class="card-image">
              <img src="assets/imgs/Card_Images/main2.jpg" alt="">
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
            <div class="smail">
              <p class="desc">${item.description}</p>
            </div>
            <div class="bottom">
              <div class="price"><span>$</span><span class="number">${item.pricePerDay} </span>/day</div>
            </div>
          </a>
        </div>
        `;
        });

        cardsContainer.innerHTML = ProductUI;
      } else {
        spinner.style.display = "none";

        cardsContainer.innerHTML = `<span>${res.message}</span>`;
      }
    });
};

generateProduct();

//================ Start Search Bar ================

let filterArray = [];
let searchBar = document.getElementById("itemsPageSearch");

// Live searching using keyup input

searchBar.addEventListener("keyup", (event) => {
  let text = searchBar.value;
  filterArray = product.filter((item) => {
    if(item.productSubCat.includes(text)) {
      return item.productSubCat;
    }
  });
  if(this.value == "") {
    generateProduct(product);
  } else {
    if(filterArray == "") {
      cardsContainer.innerHTML = "";
      // ======== Showing Empty Items Page ========
      let emptyItemsPage = document.getElementById("emptyItemsPage");
      emptyItemsPage.style.display = "block";
    } else {
      generateProduct(filterArray);
    }
  }
});

//================ End Search Bar ================




// Save Item Data

function saveItemData(id) {
  localStorage.setItem("ProductId", id);
  window.location = "item_details.html";
}

//================ Move to items page ================
//======================= Start Filter Section =======================

let cat = document.querySelectorAll(".card-section .container ul li");
let card = Array.from(document.querySelectorAll(".card-section .container .cards .all"));

cat.forEach(function(li) {
  li.addEventListener("click", function() {
    cat.forEach(function(li) {
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
let addedItem = localStorage.getItem("productInFavorite") ? JSON.parse(localStorage.getItem("productInFavorite")) : [];

if(addedItem) {
  addedItem.forEach((item) => {
    let favContainerElement = document.querySelector(`#item-${item.id}`);
    if(favContainerElement) {
      favContainerElement.classList.add("active");
      let favIconElement = favContainerElement.querySelector(".fa-heart");
      favIconElement.classList.add("main-color");
      favoriteBadge.innerHTML = addedItem.length;
      favoriteBadge.style.display = "block";
    }
    favoriteItemsCount = addedItem.length;
  })
}


// Add To Favorite 
function addedToFavorite(id) {
  // Check if user has account or not when he click on favorite card
  if(localStorage.getItem("username")) { // =================== Api ===================
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
      if(favoriteItemsCount === 0) {
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



