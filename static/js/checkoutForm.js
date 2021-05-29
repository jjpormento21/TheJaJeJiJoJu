let mainNavbar = document.getElementById('mainNav');
mainNavbar.classList.remove('sticky-top');

var stepCounter = 0; //form step counter

// Same address as billing
let checkbox1 = document.getElementById('customCheck1');
checkbox1.addEventListener('click', sameAddress);

// Payment Method options
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

// Input Fields: Checkout
let regionForm = document.querySelector('#region');
let billingAddInput = document.querySelector('#billingAdd');
//Other Variables
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

// Button Event Listeners
for (const nextButton of nextButtons) {
  nextButton.addEventListener('click', validator);
}
for (const prevButton of prevButtons) {
  prevButton.addEventListener('click', prevPaymentStep);
}

// Functions
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
  checkoutNavbarList[stepCounter].classList.remove('text-success');
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
  let billingAddress = billingAddInput.value;
  let shippingAddInput = document.getElementById('shipAdd');
  shippingAddInput.value = billingAddress;
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
  let billingAdd = billingAddInput.value;
  let shippingAdd = document.querySelector('#shipAdd').value;
  let phone1 = document.querySelector('#phone1').value;
  let phone2 = document.querySelector('#phone2').value;
  let email = document.querySelector('#email').value;
  let region = document.querySelector('#region').value;
  let shipFee = document.querySelector('#shipFeePreview').innerHTML;
  let courier = document.querySelector('#courier').value;
  let city = document.querySelector('#city').value;
  let province = document.querySelector('#province').value;
  //set values
  document.querySelector('#fullName').innerHTML = firstName + ' ' + lastName;
  document.querySelector('#billingAddFull').innerHTML = billingAdd;
  document.querySelector('#shippingAddFull').innerHTML = shippingAdd;
  document.querySelector('#phoneNumber1').innerHTML = phone1;
  let phone2Final = (phone2 == '') ? 'N/A' : phone2;
  document.querySelector('#phoneNumber2').innerHTML = phone2Final;
  document.querySelector('#emailFull').innerHTML = email;
  document.querySelector('#regionPreview').innerHTML = region;
  document.querySelector('#regionFinal').innerHTML = region;
  document.querySelector('#courierFinal').innerHTML = courier;
  document.querySelector('#paymethodFinal').innerHTML = paymentMethod;
  document.querySelector('#shipFeeFinal').innerHTML = shipFee;
  document.querySelector('#cityFinal').innerHTML = city;
  document.querySelector('#provinceFinal').innerHTML = province;
}

function shippingFee() {
  let regionValue = regionForm.value;
  let shipFeePreview = document.querySelector('#shipFeePreview');
  function shipFee() {
    return regionValue == 'Visayas' ? 70.00 :
      regionValue == 'Choose Region' ? 0.00 :
        regionValue == null ? 0.00 :
          150.00;
  }
  shipFeePreview.innerHTML = shipFee();
}

function validate() {
  let inputFields = document.getElementsByClassName('step1field');
  let isValid = true;
  for (const input of inputFields) {
    if (input.value === '' || input.value === null) {
      isValid = false;
      requiredAlertBanner.style.display = 'block';
      break;
    }
    else {
      isValid = true;
    }
  }
  return isValid;
}

function validator() {
  let validStatus = false;
  validStatus = validate();
  if (validStatus) {
    requiredAlertBanner.style.display = 'none';
    nextPaymentStep();
  }
}

function scrollToAlert() {
  let ecq_alert = document.querySelector('#alertECQ');
  ecq_alert.scrollIntoView();
}