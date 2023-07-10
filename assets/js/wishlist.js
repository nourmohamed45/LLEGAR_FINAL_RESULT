//======================= Start Adding cards =======================

let cardsContainerInWishList = document.querySelector(".card-section #cards");
let productSInFavorite = localStorage.getItem("productInFavorite");


//==== showing Empty Page =====
let emptyWishlist = document.getElementById("emptyWishlist");


// console.log(productSInFavorite)

if(!productSInFavorite) {
  emptyWishlist.style.display = "block";
} else {
  let cardItems = JSON.parse(productSInFavorite)
  generateProductWishList(cardItems);
}

function generateProductWishList(product) {
  let ProductUI = product.map((item) => {
    if (Number(item.productRate) < 5 && item.productRate > 0) {
      item.productStar = `<i class="fa-solid fa-star-half-stroke"></i>`;
    } else if (item.productRate === "5.0") {
      item.productStar = `<i class="fa-solid fa-star"></i>`;
    } else {
      item.productStar = `<i class="fa-regular fa-star"></i>`;
    }
    return `
      <div class="all card ${item.ProductCtegory}">
        <div class="img">
          <div class="fav" id = "item-${item.id}">
            <i class="fa-solid fa-heart" onclick = "removeFromWishList(${item.id})"></i>
          </div>
          <div class="card-image">
            <img src="${item.productImage}" alt="">
          </div>
        </div>
        <a onclick="saveItemData(${item.id})" class="details">
          <div class="top">
            <div class="title">
              <span class="subCat">${item.productSubCat}</span>, <span class="location">${item.productLocation}</span>
            </div>
            <div class="rate">
              ${item.productStar}
              <span>${item.productRate}</span>
            </div>
          </div>
          <div class="mid">
            <p class="desc">${item.productDescription}</p>
          </div>
          <div class="bottom">
            <div class="price"><span>$</span><span class="number">${item.productPrice} </span>/day</div> 
          </div>
        </a>
      </div>
      `;
  });
  cardsContainerInWishList.innerHTML = ProductUI.join("");

  // Add event listener to each favorite icon element
  
}

//======================= End Adding cards =======================

//======================= Start Filter Section =======================

let category = document.querySelectorAll(".wishlist .container ul li");
let item = Array.from(document.querySelectorAll(".wishlist .container .cards .all"));

category.forEach(function(li) {
  li.addEventListener("click", function() {
    category.forEach(function(li) {
      li.classList.remove("active");
    });
    this.classList.add("active");
    item.forEach((li) => {
      li.style.display = "none";
    });
    document.querySelectorAll(this.dataset.cat).forEach((li) => {
      li.style.display = "block";
    });
  });
});

//======================= End Filter Section =======================


//======================= Start Remove from Favourite =======================

let heartWishList = document.querySelectorAll(".wishlist .container .cards .card .img .fav");
let favoriteItemsCountInWishlist = JSON.parse(localStorage.getItem("productInFavorite"));
let favoriteItemsInWishlistArray = [];
favoriteItemsInWishlistArray.push(...favoriteItemsCountInWishlist);
let favoriteItemsInWishlistArrayCount = favoriteItemsInWishlistArray.length;


function removeFromWishList(id) {
  let storedItemsInWishlist = JSON.parse(localStorage.getItem("productInFavorite"));
  let indexInWishlist = storedItemsInWishlist.findIndex((element) => element.id === id);

  storedItemsInWishlist.splice(indexInWishlist, 1);
  localStorage.setItem("productInFavorite", JSON.stringify(storedItemsInWishlist));

  heartWishList.forEach((li) => {
    li.addEventListener("click",() => {
      li.closest(".card").remove();
    })
  })

  favoriteItemsInWishlistArrayCount--;
  if(favoriteItemsInWishlistArrayCount === 0) {
    localStorage.removeItem("productInFavorite");
    emptyWishlist.style.display = "block";
  }
}

//======================= End Remove from Favourite =======================
