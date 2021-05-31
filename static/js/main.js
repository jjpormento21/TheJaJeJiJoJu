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
  $('[data-toggle="tooltip"]').tooltip()
});

let trackNum = document.getElementById('trackNum');

// program to generate random strings
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
trackNum.innerHTML = generateString(9);
