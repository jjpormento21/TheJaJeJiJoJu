var addToWishlistButtons = document.querySelectorAll('.addToWishlist');
var deleteButtons = document.querySelectorAll('.remove-item');
var today = new Date();
var date = `${(today.getMonth() + 1)}/${today.getDate()}/${today.getFullYear()}`;
retrieveData();


for (const button of addToWishlistButtons) {
    button.addEventListener('click', addToWishlistClicked);
    button.addEventListener('click', function () {
        $('.toast').toast('show')
    })
}

for (const button of deleteButtons) {
    button.addEventListener('click', deleteItem);
}

function addToWishlistClicked(e) {
    console.log('added to wishlist');
    let button = e.target;
    let productItem = button.parentElement.parentElement.parentElement;
    let productID = productItem.querySelector('.product-id').innerText;
    let title = productItem.querySelector('.product-name').innerText;
    let price = productItem.querySelector('.product-price').innerText.replace('₱', '');
    price = parseFloat(price);
    let imgSrc = productItem.querySelector('.product-img').src;
    storeToLocalStorage(productID, title, price, imgSrc);
    e.target.setAttribute('data-original-title', '✅ Added to wishlist');
}

function storeToLocalStorage(id, title, price, imgSrc) {
    let wishlistItem = {
        productID: id,
        productPrice: price,
        productImg: imgSrc
    }
    let product = title.toString();
    wishlistItem = JSON.stringify(wishlistItem);
    localStorage.setItem(product, wishlistItem);
}

function deleteItem(event) {
    let wishlistItem = event.target.parentElement.parentElement;
    removeWishlistItem(event);
    wishlistItem.remove();
}

function addItemToWishlist(id, title, price, imgSrc) {
    let wishlist = document.querySelector('#wishlist');
    let wishlistItem = document.createElement('tr');
    let itemContents = `<td>
        <img src="${imgSrc}" 
        alt="${title}"
        class="wishlist-item-img product-img">
    </td>
    <td class="product-id" hidden>${id}</td>
    <td class="product-name"> <a href="/product/${id}"> ${title}</a> </td>
    <td class="product-price">₱${price}</td>
    <td>In Stock</td>
    <td>${date}</td>
    <td class="text-center">
        <button class="btn btn-main addToCartWishlist">Add to Cart</button>
        <button class="btn btn-link text-secondary remove-item">Remove</button>
    </td>`;
    wishlistItem.innerHTML = itemContents;
    wishlist.append(wishlistItem);
    wishlistItem.querySelector('.remove-item').addEventListener('click', deleteItem);
}

function retrieveData() {
    const pageData = $("#page-data").data();
    if (pageData.pageid != 4) return;
    for (let i = 0; i < localStorage.length; i++) {
        let productName = localStorage.key(i);
        let object = localStorage.getItem(productName);
        let objectFinal = JSON.parse(object);

        //Product Info
        let id = objectFinal.productID;
        let imgSrc = objectFinal.productImg;
        let price = objectFinal.productPrice;
        addItemToWishlist(id, productName, price, imgSrc);
    }

}

function removeWishlistItem(e) {
    let productName = e.target.parentElement.parentElement.querySelector('.product-name').innerText;
    localStorage.removeItem(productName);
}