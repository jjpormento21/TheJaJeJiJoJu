var addToWishlistButtons = document.querySelectorAll('.addToWishlist');
var deleteButtons = document.querySelectorAll('.remove-item');


for (const button of addToWishlistButtons) {
    button.addEventListener('click', addToWishlistClicked);
}

for (const button of deleteButtons) {
    button.addEventListener('click', deleteItem);
}

function addToWishlistClicked(e){
    console.log('added to wishlist');
    let button = e.target;
    let productItem = button.parentElement.parentElement.parentElement;
    let productID = productItem.querySelector('.product-id').innerText;
    let title = productItem.querySelector('.product-name').innerText;
    let price = productItem.querySelector('.product-price').innerText.replace('₱', '');
    price = parseFloat(price);
    let imgSrc = productItem.querySelector('.product-img').src;
    // storeToLocalStorage(productID, title, price, imgSrc);
    e.target.setAttribute('data-original-title', '✅ Added to wishlist');
}

function storeToLocalStorage(id, title, price, imgSrc){
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
    wishlistItem.remove();
}

function addItemToWishlist(id, title, price, imgSrc){

}