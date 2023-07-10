let productInOrdersPage = localStorage.getItem("myOrders");
let emptyOrdersPage = document.getElementById("myOrders")
if (productInOrdersPage === null) { 
  emptyOrdersPage.style.display = "block";
}

