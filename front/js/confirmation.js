function confirmation(){
    const orderId = document.getElementById("orderId");
    orderID.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}
confirmation();
  