console.log('cart js loaded.');

var deleteButtons = document.getElementsByClassName('cart-item-delete');
for (const button of deleteButtons) {
    button.addEventListener('click', deleteItem);
}

var quantityInputs = document.getElementsByClassName('cart-item-qty');
for (const input of quantityInputs) {
    input.addEventListener('change', updateTotal);
}

updateTotal();
function deleteItem(event){
    let cartItem = event.target.parentElement.parentElement;
    cartItem.remove();
    updateTotal();
}

function updateTotal(){
    let cartItem = document.getElementsByClassName('cart-item');
    let total = 0;
    for (const item of cartItem) {
        let priceElement = item.getElementsByClassName('cart-item-price')[0];
        let quantityElement = item.getElementsByClassName('cart-item-qty')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total += (price*quantity);
    }
    let totalPrice = document.querySelector('.cart-total');
    total = Math.round(total * 100) / 100;
    totalPrice.innerHTML = '$' + total;
    console.log(total);
}