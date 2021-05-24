//Tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

var cartButton = document.getElementById('cartButton');
cartButton.addEventListener('click', openCart);

function openCart(){
  let cart = document.getElementsByClassName('cart')[0];
  if (cart.style.display === 'none'){
    cart.style.display = 'block';
  }
  else {
    cart.style.display = 'none';
  }
}