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
let validStatus = false;
let regionForm = document.querySelector('#region');
let courierSelector = document.querySelector('#courier');
courierSelector.addEventListener('change', shippingFee);
var paymentMethod;
var requiredAlertBanner = document.querySelector('#requiredAlert');

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
  nextButton.addEventListener('click', validator);
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
  scrollToAlert();
}

function prevPaymentStep() {
  stepCounter -= 1;
  checkoutNavbarList[stepCounter].classList.add('text-primary', 'active', 'font-weight-bold');
  checkoutNavbarList[stepCounter + 1].classList.remove('active', 'font-weight-bold');
  checkoutNavbarList[stepCounter + 1].classList.remove('text-success');
  checkoutNavbarList[stepCounter + 1].classList.add('disabled', 'text-primary');
  formSections[stepCounter].style.display = 'block';
  formSections[stepCounter + 1].style.display = 'none';
  scrollToAlert();
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

let firstNameInput = document.querySelector('#firstName');
let lastNameInput = document.querySelector('#lastName');
let billingAddInput = document.querySelector('#billingAdd');
let shippingAddInput = document.querySelector('#shipAdd');
let phone1Input = document.querySelector('#phone1');
let emailInput = document.querySelector('#email');
let regionInput = document.querySelector('#region');
let provinceInput = document.querySelector('#province');
let cityInput = document.querySelector('#city');



function setSummaryInfo() {
  // Select form elements
  let firstName = firstNameInput.value;
  let lastName = lastNameInput.value;
  let billingAdd = billingAddInput.value;
  let shippingAdd = shippingAddInput.value;
  let phone1 = phone1Input.value;
  let email = emailInput.value;
  let region = regionInput.value;
  let shipFee = document.querySelector('#shipFeePreview').innerHTML;
  let courier = document.querySelector('#courier').value;
  //set values
  document.querySelector('#fullName').innerHTML = firstName + ' ' + lastName;
  document.querySelector('#billingAddFull').innerHTML = billingAdd;
  document.querySelector('#shippingAddFull').innerHTML = shippingAdd;
  document.querySelector('#phoneNumber').innerHTML = phone1;
  document.querySelector('#emailFull').innerHTML = email;
  document.querySelector('#regionPreview').innerHTML = region;
  document.querySelector('#regionFinal').innerHTML = region;
  document.querySelector('#courierFinal').innerHTML = courier;
  document.querySelector('#paymethodFinal').innerHTML = paymentMethod;
  document.querySelector('#shipFeeFinal').innerHTML = shipFee;
  console.log('success');
}

function shippingFee() {
  let regionValue = regionForm.value;
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

function validate() {
  let inputFields = document.getElementsByClassName('step1field');
  let isValid = true;
  for (const input of inputFields) {
    if (input.value === '' || input.value === null){
      isValid = false;
      requiredAlertBanner.style.display = 'block';
      break;
    }
    else{
      isValid = true;
    }
  }
  return isValid;
}

function validator(){
  validStatus = validate();
  if (validStatus){
    nextPaymentStep();
  }
}

function scrollToAlert(){
  let ecq_alert = document.querySelector('#alertECQ');
  ecq_alert.scrollIntoView();
}