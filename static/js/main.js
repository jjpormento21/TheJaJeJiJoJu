//Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

let cartButton = document.querySelector('#cartButton');
cartButton.addEventListener('click', function(){
  let cart = document.querySelector('#cart');
  if (cart.style.display === 'none'){
    cart.style.display = 'block';
  }
  else{
    cart.style.display = 'none';
  }
})

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
