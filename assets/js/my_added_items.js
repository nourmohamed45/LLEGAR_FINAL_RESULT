let productInMyItemsPage = localStorage.getItem("myItems");
let emptyMyItemsPage = document.getElementById("myItemsEmptyPage")
if (productInMyItemsPage === null) { 
  emptyMyItemsPage.style.display = "block";
}
