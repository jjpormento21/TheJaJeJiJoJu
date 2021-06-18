let mainNavbar = document.getElementById('mainNav');
mainNavbar.classList.remove('sticky-top');
document.querySelector('#cartButton').remove(); //removes cart button
document.querySelector('#cart').remove(); //removes cart
sessionStorage.clear();
let trackNum = document.getElementById('trackNum');

// program to generate random strings
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
trackNum.innerHTML = generateString(9);