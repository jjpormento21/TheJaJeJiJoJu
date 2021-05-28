// Input Fields: Checkout
let mainNavbar = document.getElementById('mainNav');
mainNavbar.classList.remove('sticky-top');
var stepCounter = 0; //form step counter

let checkbox1 = document.getElementById('customCheck1');
checkbox1.addEventListener('click', sameAddress);

let codInput = document.getElementById('COD');
codInput.addEventListener('click', hideCardPaymentMethod);

let creditInput = document.getElementById('creditCard')
creditInput.addEventListener('click', showCardPaymentMethod);

let debitInput = document.getElementById('debitCard')
debitInput.addEventListener('click', showCardPaymentMethod);

// Dynamic form steps
var formSections = document.getElementsByClassName('form-step');
formSections[0].style.display = 'block';

// Payment Method events
let radioButtons = document.getElementsByName('paymentMethod');
for (const radioButton of radioButtons) {
  radioButton.addEventListener('click', getPaymentMethod);
}

// Button Control events
var checkoutNavbarList = document.getElementsByClassName('tab-checkout');
let nextButtons = document.getElementsByClassName('nextStep');
let prevButtons = document.getElementsByClassName('prevStep');

//Other Variables
let regionSelector = document.querySelector('#region');
let courierSelector = document.querySelector('#courier');
courierSelector.addEventListener('change', shippingFee);
var paymentMethod;

// Other tabs are disabled by default
for (let i = 0; i < checkoutNavbarList.length; i++) {
  let navLink = checkoutNavbarList[i];
  if (i == 0) {
    navLink.classList.add('active');
    navLink.classList.add('text-primary', 'font-weight-bold');
  }
  else {
    navLink.classList.add('disabled');
  }
}

for (const nextButton of nextButtons) {
  nextButton.addEventListener('click', nextPaymentStep);
}
for (const prevButton of prevButtons) {
  prevButton.addEventListener('click', prevPaymentStep);
}

function nextPaymentStep() {
  stepCounter += 1;
  checkoutNavbarList[stepCounter - 1].classList.remove('active', 'font-weight-bold');
  checkoutNavbarList[stepCounter - 1].classList.add('disabled', 'text-success');
  checkoutNavbarList[stepCounter].classList.add('active', 'text-primary', 'font-weight-bold');
  formSections[stepCounter].style.display = 'block';
  formSections[stepCounter - 1].style.display = 'none';
  setSummaryInfo();
}

function prevPaymentStep() {
  stepCounter -= 1;
  checkoutNavbarList[stepCounter].classList.add('text-primary', 'active', 'font-weight-bold');
  checkoutNavbarList[stepCounter + 1].classList.remove('active', 'font-weight-bold');
  checkoutNavbarList[stepCounter + 1].classList.remove('text-success');
  checkoutNavbarList[stepCounter + 1].classList.add('disabled', 'text-primary');
  formSections[stepCounter].style.display = 'block';
  formSections[stepCounter + 1].style.display = 'none';
}

function showCardPaymentMethod() {
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
  cardPaymentSection.style.display = 'none';
}

function getPaymentMethod(e) {
  let formValue = e.target.value;
  paymentMethod = formValue;
}

function setSummaryInfo() {
  // Select form elements
  let firstName = document.querySelector('#firstName').value;
  let lastName = document.querySelector('#lastName').value;
  let billingAdd = document.querySelector('#billingAdd').value;
  let shippingAdd = document.querySelector('#shipAdd').value;
  let phone1 = document.querySelector('#phone1').value;
  let email = document.querySelector('#email').value;
  let shipTo = document.querySelector('#region').value;
  let shipFee = document.querySelector('#shipFeePreview').innerHTML;
  let courier = document.querySelector('#courier').value;
  //set values
  document.querySelector('#fullName').innerHTML = firstName + ' ' + lastName;
  document.querySelector('#billingAddFull').innerHTML = billingAdd;
  document.querySelector('#shippingAddFull').innerHTML = shippingAdd;
  document.querySelector('#phoneNumber').innerHTML = phone1;
  document.querySelector('#emailFull').innerHTML = email;
  document.querySelector('#regionPreview').innerHTML = shipTo;
  document.querySelector('#regionFinal').innerHTML = shipTo;
  document.querySelector('#courierFinal').innerHTML = courier;
  document.querySelector('#paymethodFinal').innerHTML = paymentMethod;
  document.querySelector('#shipFeeFinal').innerHTML = shipFee;
  console.log('success');
}

function shippingFee() {
  console.log('shipfee function works');
  let regionValue = regionSelector.value;
  let shipFee = document.querySelector('#shipFeePreview');
  if (regionValue == 'Visayas') {
    shipFee.innerHTML = 70.00;
  }
  else if (regionValue == 'Choose Region' || regionValue == '') {
    shipFee.innerHTML = 0.00;
  }
  else {
    shipFee.innerHTML = 150.00;
  }
}