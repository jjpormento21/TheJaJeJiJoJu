//Tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

var cartButton = document.getElementById('cartButton');
cartButton.addEventListener('click', openCart);

var cartCloseButton = document.getElementById('closeCartButton');
cartCloseButton.addEventListener('click', closeCart);

function openCart(){
  let cart = document.getElementsByClassName('cart')[0];
  if (cart.style.display === 'none'){
    cart.style.display = 'block';
  }
  else {
    cart.style.display = 'none';
  }
}

function closeCart(){
  let cart = document.getElementsByClassName('cart')[0];
  cart.style.display = 'none';
}