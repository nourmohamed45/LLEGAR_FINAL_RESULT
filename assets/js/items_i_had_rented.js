let productInMyItemsIHadRentedPage = localStorage.getItem("emptyItemsIHadRented");
let emptyItemsIHadRented = document.getElementById("emptyItemsIHadRented")
if (productInMyItemsIHadRentedPage === null) { 
  emptyItemsIHadRented.style.display = "block";
}
