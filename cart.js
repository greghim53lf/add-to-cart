let products = localStorage.getItem("products") || [
  { name: "Laptop", price: 70000, quantity: 0 },
  { name: "Phone", price: 700000, quantity: 0 },
  { name: "Clothes", price: 170000, quantity: 0 },
  { name: "Watches", price: 7000, quantity: 0 },
];
if (localStorage.getItem("products"))
  products = JSON.parse(localStorage.getItem("products"));

document.querySelectorAll('tr').forEach(row => {
  if (row.style.animationPlayState === "running") row.style.animationPlayState = "pause"
})
  
let createComponent = (product) => {
  let tableRow = document.createElement("tr");
  let tableDataProductName = document.createElement("td");
  let tableDataProductPrice = document.createElement("td");
  let tableDataProductControls = document.createElement("td");
  let div = document.createElement("div");
  let button = document.createElement("button");
  let quantity = document.createElement("input");

  button.dataset.product = `${product.name}`;
  quantity.dataset.product = `${product.name}`;

  tableDataProductName.className = "product-name";
  tableDataProductPrice.className = "product-price";
  tableDataProductControls.className = "controls";
  div.className = "button-and-quantity";
  button.className = "add-to-cart-btn";
  quantity.className = "quantity";

  tableDataProductName.innerHTML = `${product.name}`;
  tableDataProductPrice.innerHTML = `₦${product.price.toLocaleString()}`;
  button.innerHTML = "Add to Cart";
  button.type = "button";
  quantity.value = `${product.quantity}`;
  quantity.type = "number";

  div.append(button, quantity);
  tableDataProductControls.append(div);
  tableRow.append(
    tableDataProductName,
    tableDataProductPrice,
    tableDataProductControls
  );
  document.querySelector("tbody").append(tableRow);
};

products.forEach((product) => createComponent(product));

document.querySelector("#cart-quantity").innerHTML =
  localStorage.getItem("cartQuantity") || 0;

const btns = document.querySelectorAll(".add-to-cart-btn");
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let product = products.find((product) => {
      return (
        product.name ===
        e.target.dataset.product
      );
    });
    ++product.quantity;

    let cartQuantity = products.reduce((total, product) => {
      return (total += product.quantity);
    }, 0);

    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("cartQuantity", cartQuantity);

    location.reload();
  });
});

document.querySelectorAll(".quantity").forEach((input) => {
  input.addEventListener("change", (e) => {
    let product = products.find((product) => {
      return (
        product.name ===
        e.target.dataset.product
      );
    });
    let inputValue = parseInt(input.value);

    if (inputValue < 0) {
      input.value = 0;
      return;
    }
    product.quantity = inputValue;

    let cartQuantity = products.reduce((total, product) => {
      return (total += product.quantity);
    }, 0);

    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("cartQuantity", cartQuantity);

    location.reload();
  });
});

let cart = document.querySelector(".cart");
cart.addEventListener("click", () => {
  cart.style.transform = "scale(0.8)";
  location.href = "CartItems.html";
});
