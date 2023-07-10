let productInRentedPage = localStorage.getItem("emptyRentedItems");
let emptyRentedItems = document.getElementById("emptyRentedItems")
if (productInRentedPage === null) { 
  emptyRentedItems.style.display = "block";
}
