console.log('cart js loaded.');

// var productItemCounter = 0;
// sessionStorage.setItem('cartCounter', toString(productItemCounter));

var deleteButtons = document.getElementsByClassName('cart-item-delete');
for (const button of deleteButtons) {
    button.addEventListener('click', deleteItem);
}

var quantityInputs = document.getElementsByClassName('cart-item-qty');
for (const input of quantityInputs) {
    input.addEventListener('change', updateTotal);
}

var addToCartButtons = document.getElementsByClassName('addToCart');
for (const button of addToCartButtons) {
    button.addEventListener('click', addToCartClicked);
}

function updateBadge() {
    let cartItems = document.querySelectorAll('.cart-item').length;
    let cartBadge = document.querySelector('#cartBadge');
    cartBadge.innerHTML = cartItems;
    if (cartItems < 1) {
        cartBadge.style.visibility = 'hidden';
    }
    else {
        cartBadge.style.visibility = 'visible';
    }
}

function deleteItem(event) {
    let cartItem = event.target.parentElement.parentElement;
    cartItem.remove();
    updateTotal();
    updateBadge();
}

function addToCartClicked(e) {
    console.log('added to cart');
    let button = e.target;
    let productItem = button.parentElement.parentElement.parentElement;
    console.log(productItem);
    let title = productItem.querySelector('.product-name').innerText;
    let price = productItem.querySelector('.product-price').innerText.replace('₱', '');
    price = parseFloat(price);
    let imgSrc = productItem.querySelector('.product-img').src;
    addItemToCart(title, price, imgSrc);
    updateTotal();
    updateBadge();
}

function addItemToCart(title, price, imgSrc) {
    let cartItem = document.createElement('div');
    cartItem.classList.add('row', 'cart-item', 'mb-3');
    let cartContainer = document.querySelector('.cart-container');
    let cartItemNames = document.getElementsByClassName('cart-item-name');
    for (const itemName of cartItemNames) {
        if (itemName.innerText == title) {
            alert('Item already added to cart.')
            return 0;
        }
    }
    let cartItemContents = `<div class="col-md-3">
    <img src="${imgSrc}" alt="cart"
      class="cart-item-img">
  </div>
  <div class="col-md-4">
    <p class="cart-item-name mb-0">${title}</p>
    <p class="cart-item-price text-muted mt-0">₱${price}</p>
    <a class="btn btn-link text-danger cart-item-delete p-0"><i class="bi bi-cart-x-fill"></i> Remove</a>
  </div>
  <div class="col-md-5">
    <label for="cart-item-qty">QTY</label>
    <input type="number" name="cart-item-qty" class="cart-item-qty form-control" value="1" min="1" max="100">
  </div>`
    cartItem.innerHTML = cartItemContents;
    cartContainer.append(cartItem);
    cartItem.querySelector('.cart-item-delete').addEventListener('click', deleteItem);
    cartItem.querySelector('.cart-item-qty').value = 1;
    cartItem.querySelector('.cart-item-qty').addEventListener('change', updateTotal)
    storeData(title, 1, price, imgSrc);
}

function updateTotal() {
    let cartItem = document.getElementsByClassName('cart-item');
    let total = 0;
    for (const item of cartItem) {
        let priceElement = item.getElementsByClassName('cart-item-price')[0];
        let quantityElement = item.getElementsByClassName('cart-item-qty')[0];
        let price = parseFloat(priceElement.innerText.replace('₱', ''));
        let quantity = quantityElement.value;
        total += (price * quantity);
    }
    let totalPrice = document.querySelector('.cart-total');
    total = Math.round(total * 100) / 100;
    totalPrice.innerHTML = '₱' + total;
    console.log(total);
}

function storeData(title, qty, price, imgSrc){
    let cartItem = {quantity: qty, productPrice: price, imageLink: imgSrc};
    let product = title.toString();
    let cartItemString = JSON.stringify(cartItem);
    sessionStorage.setItem(product, cartItemString);
}

function retrieveCart(){
    for (i=0; i<sessionStorage.length; i++){
        let productName = sessionStorage.key(i);
        let object = sessionStorage.getItem(productName);
        let objectFinal = JSON.parse(object);

        //Product Info
        let quantity = objectFinal.quantity;
        let imgSrc = object.imgLink;
        let price = object.productPrice;
        
    }
}