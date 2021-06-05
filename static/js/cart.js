retrieveCart();

var buyNowButtons = document.getElementsByClassName('buyNow');
for (const button of buyNowButtons) {
    button.addEventListener('click', addToCartClicked);
    button.addEventListener('click', function(){
        document.location = '/checkout';
    });
}

var deleteButtons = document.getElementsByClassName('cart-item-delete');
for (const button of deleteButtons) {
    button.addEventListener('click', deleteItem);
}

var quantityInputs = document.getElementsByClassName('cart-item-qty');
for (const input of quantityInputs) {
    input.addEventListener('change', updateTotal);
    input.addEventListener('change', storeQuantity);
}

var addToCartButtons = document.getElementsByClassName('addToCart');
for (const button of addToCartButtons) {
    button.addEventListener('click', addToCartClicked);
    button.addEventListener('click', showCart);
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
    removeCartData(event);
    updateTotal();
    updateBadge();
}

function addToCartClicked(e) {
    console.log('added to cart');
    let button = e.target;
    let productItem = button.parentElement.parentElement.parentElement;
    let productID = productItem.querySelector('.product-id').innerText;
    let title = productItem.querySelector('.product-name').innerText;
    let price = productItem.querySelector('.product-price').innerText.replace('₱', '');
    price = parseFloat(price);
    let imgSrc = productItem.querySelector('.product-img').src;
    addItemToCart(title, 1, price, imgSrc);
    storeData(productID, title, 1, price, imgSrc);
    updateTotal();
    updateBadge();
}

function addItemToCart(title, qty, price, imgSrc) {
    let cartItem = document.createElement('div');
    cartItem.classList.add('row', 'cart-item', 'mb-3');
    let cartContainer = document.querySelector('.cart-container');
    let cartItemNames = document.getElementsByClassName('cart-item-name');
    for (const itemName of cartItemNames) {
        if (itemName.innerText == title) {
            alert('Item already added to cart.')
            return;
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
    cartItem.querySelector('.cart-item-qty').value = qty;
    cartItem.querySelector('.cart-item-qty').addEventListener('change', updateTotal)
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
    sessionStorage.setItem('total', total.toString());
}

function storeData(id,title, qty, price, imgSrc) {
    let cartItem = {productID: id ,quantity: qty, productPrice: price, imageLink: imgSrc };
    let product = title.toString();
    let cartItemString = JSON.stringify(cartItem);
    sessionStorage.setItem(product, cartItemString);
}

function retrieveCart() {
    for (i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.key(i) == 'total') {
            continue;
        }
        let productName = sessionStorage.key(i);
        let object = sessionStorage.getItem(productName);
        let objectFinal = JSON.parse(object);

        //Product Info
        let imgSrc = objectFinal.imageLink;
        let price = objectFinal.productPrice;
        let quantity = objectFinal.quantity;

        addItemToCart(productName, quantity, price, imgSrc);
        updateTotal();
        updateBadge();
    }
}

function storeQuantity(e) {
    let productName = e.target.parentElement.parentElement.querySelector('.cart-item-name').innerHTML;
    let productItem = JSON.parse(sessionStorage.getItem(productName));
    productItem.quantity = parseInt(e.target.value);
    sessionStorage.setItem(productName, JSON.stringify(productItem));
}

function removeCartData(e) {
    let productName = e.target.parentElement.querySelector('.cart-item-name').innerHTML;
    sessionStorage.removeItem(productName);
}

function showCart() {
    document.querySelector('#cart').style.display = 'block';
}