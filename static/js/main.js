//Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Input Fields: Checkout
let checkbox1 = document.getElementById('customCheck1');
checkbox1.addEventListener('click', sameAddress);

let codInput = document.getElementById('COD');
codInput.addEventListener('click', hideCardPaymentMethod);

let creditInput = document.getElementById('creditCard')
creditInput.addEventListener('click', showCardPaymentMethod);

let debitInput = document.getElementById('debitCard')
debitInput.addEventListener('click', showCardPaymentMethod);

function showCardPaymentMethod(){
  let cardPaymentSection = document.getElementById('payCard');
  cardPaymentSection.style.display = 'block';
}
function sameAddress() {
  let billingAddInput = document.getElementById('billingAdd');
  let billingAddress = billingAddInput.value;
  let shippingAddInput = document.getElementById('shipAdd');
  if (checkbox1.checked == true) {
    shippingAddInput.value = billingAddress;
  }
}

function hideCardPaymentMethod() {
  let cardPaymentSection = document.getElementById('payCard');
  if (codInput.checked == true) {
    cardPaymentSection.style.display = 'none';
  }
}