//Tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

let checkbox1 = document.getElementById('customCheck1');
checkbox1.addEventListener('click', sameAddress);

function sameAddress(){
  let billingAddInput = document.getElementById('billingAdd');
  let billingAddress = billingAddInput.value;
  let shippingAddInput = document.getElementById('shipAdd');
  if (checkbox1.checked == true){
    shippingAddInput.value = billingAddress;
  }
}