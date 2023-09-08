// GET PRODUCTS ADDED TO CART FROM LOCAL STORAGE
let cartItems = JSON.parse(localStorage.getItem("products"));

// ADD EVENT LISTENER FOR BACK BUTTON
let backBtn = document.querySelector("#back");
backBtn.addEventListener("click", () => {
  backBtn.style.transform = "scale(0.8)";
  location.href = "cart.html";
});

// COMPONENT TO POPULATE DOM WITH CART ITEM
let productComponent = (product) => {
  let productName = document.createElement("td");
  let productPrice = document.createElement("td");
  let productQuantity = document.createElement("td");
  let productQuantityValue = document.createElement("input");
  let productTotal = document.createElement("td");
  let deleteProduct = document.createElement("td");
  let productRow = document.createElement("tr");

  productName.innerHTML = `${product.name}`;
  productPrice.innerHTML = `₦${product.price.toLocaleString()}`;
  productQuantityValue.dataset.product = `${product.name}`;
  productQuantityValue.className = "quantity";
  productQuantityValue.type = "number";
  productQuantityValue.value = product.quantity;
  productTotal.innerHTML = `₦${(
    product.quantity * product.price
  ).toLocaleString()}`;
  deleteProduct.className = "delete-btn";
  deleteProduct.dataset.product = `${product.name}`;
  deleteProduct.innerHTML = "X";

  productQuantity.append(productQuantityValue);
  productRow.append(
    productName,
    productPrice,
    productQuantity,
    productTotal,
    deleteProduct
  );
  document.querySelector("tbody").append(productRow);
};

// CREATE COMPONENTS FOR EVERY CART ITEM
cartItems.forEach((cartItem) => {
  if (cartItem.quantity > 0) {
    productComponent(cartItem);
  }
});

// GET THE TOTAL QUANTITY OF CART ITEMS
let getCartQuantity = () => {
  return cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity;
  }, 0);
};

// INCREASE/DECREASE ITEM IN CART
document.querySelectorAll(".quantity").forEach((input) => {
  input.addEventListener("change", (e) => {
    let inputValue = parseInt(input.value);
    let cartItem = cartItems.find((item) => {
      return item.name === e.target.dataset.product;
    });
    if (inputValue < 0) {
      input.value = 0;
      return;
    }
    cartItem.quantity = inputValue;

    localStorage.setItem("cartQuantity", getCartQuantity());
    localStorage.setItem("products", JSON.stringify(cartItems));

    location.reload();
  });
});

// DELETE CART ITEM
document.querySelectorAll(".delete-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    let cartItem = cartItems.find(
      (cartItem) => cartItem.name === e.target.dataset.product
    );
    cartItem.quantity = 0;

    localStorage.setItem("cartQuantity", getCartQuantity());
    localStorage.setItem("products", JSON.stringify(cartItems));

    e.target.parentElement.style.animationPlayState = "running";
    e.target.parentElement.addEventListener("animationend", () => {
      e.target.parentElement.remove();
      location.reload()
    });
  });
});

// CREATE CART TOTAL ROW
const cartTotal = cartItems.reduce((total, cartItem) => {
  return (total += cartItem.price * cartItem.quantity);
}, 0);


let cartTotalElement = document.createElement('td')
let cartTotalText = document.createElement('td')
let cartTotalRow = document.createElement('tr')
cartTotalText.innerHTML = "Total"
cartTotalRow.className = "cart-total"
cartTotalElement.innerHTML = `₦${cartTotal.toLocaleString()}`;
cartTotalElement.colSpan = '5'
cartTotalElement.style.textAlign = 'right'
cartTotalRow.append(cartTotalText, cartTotalElement)
document.querySelector('tbody').append(cartTotalRow)