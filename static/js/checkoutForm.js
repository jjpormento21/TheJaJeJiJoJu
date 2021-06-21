let mainNavbar = document.getElementById('mainNav');
mainNavbar.classList.remove('sticky-top');
document.querySelector('#cartButton').remove(); //removes cart button
document.querySelector('#cart').remove(); //removes cart

let subNavbar = document.querySelector('#checkout-tab');
var screenSize = window.matchMedia('(max-width: 800px)');
screenSize.addEventListener('change', removeStickyNav);
removeStickyNav();
// Media query
function removeStickyNav() {
  if (!screenSize.matches) return;
  subNavbar.classList.remove('sticky-top');
}

var stepCounter = 0; //form step counter
getCartData();
// function to prevent enter key from submitting
$(document).ready(function () {
  $(window).keydown(function (event) {
    if ((event.keyCode == 13) && (stepCounter < 3)) {
      event.preventDefault();
      validator();
      return false;
    }
    else if ((event.keyCode == 13) && (stepCounter == 3)) {
      document.querySelector('#checkoutForm').submit();
    }
  });
});

// Same address as billing
let checkbox1 = document.getElementById('customCheck1');
checkbox1.addEventListener('click', sameAddress);

// Payment Method options
let codInput = document.getElementById('COD');
codInput.addEventListener('click', hideCardPaymentMethod);

let creditInput = document.getElementById('creditCard');
creditInput.addEventListener('click', showCardPaymentMethod);

let debitInput = document.getElementById('debitCard');
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
  if (stepCounter > 2) document.querySelector('#cartPreviewBox').remove();
  setSummaryInfo();
  scrollToAlert();
  savePurchases();
}

function prevPaymentStep() {
  stepCounter -= 1;
  checkoutNavbarList[stepCounter].classList.remove('text-success');
  checkoutNavbarList[stepCounter].classList.add('text-primary', 'active', 'font-weight-bold');
  checkoutNavbarList[stepCounter + 1].classList.remove('active', 'font-weight-bold','text-success');
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
  let shipFee = document.querySelector('#shipFeePreview').innerText;
  let courier = document.querySelector('#courier').value;
  let city = document.querySelector('#city').value;
  let province = document.querySelector('#province').value;
  //set values
  document.querySelector('#fullName').innerText = firstName + ' ' + lastName;
  document.querySelector('#billingAddFull').innerText = billingAdd;
  document.querySelector('#shippingAddFull').innerText = shippingAdd;
  document.querySelector('#phoneNumber1').innerText = phone1;
  let phone2Final = (phone2 == '') ? 'N/A' : phone2;
  document.querySelector('#phoneNumber2').innerText = phone2Final;
  document.querySelector('#emailFull').innerText = email;
  document.querySelector('#regionPreview').innerText = region;
  document.querySelector('#regionFinal').innerText = region;
  document.querySelector('#courierFinal').innerText = courier;
  document.querySelector('#paymethodFinal').innerText = paymentMethod;
  document.querySelector('#shipFeeFinal').innerText = shipFee;
  document.querySelector('#cityFinal').innerText = city;
  document.querySelector('#provinceFinal').innerText = province;
  updateGrandTotal();
}

function shippingFee() {
  let shipFeePreview = document.querySelector('#shipFeePreview');
  let regionValue = regionForm.value;
  function shipFee() {
    return regionValue == 'Visayas' ? 70.00 :
      regionValue == 'Choose Region' ? 0.00 :
        regionValue == null ? 0.00 :
          150.00;
  }
  shipFeePreview.innerText = shipFee();
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

function getCartData() {
  for (let i = 0; i < sessionStorage.length; i++) {
    if (sessionStorage.key(i) == 'total') continue;
    let productName = sessionStorage.key(i);
    let object = sessionStorage.getItem(productName);
    let objectFinal = JSON.parse(object);

    //Product Info
    let price = objectFinal.productPrice;
    let quantity = objectFinal.quantity;

    let checkoutCart = document.querySelector('#cartPreview');
    let cartItem = document.createElement('li');
    cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-condensed', 'cart-item');
    let div = document.createElement('div');
    let cartItemName = document.createElement('h6');
    let cartItemQty = document.createElement('small');
    let cartItemPrice = document.createElement('span');
    cartItemName.classList.add('my-0');
    cartItemName.innerText = productName;
    cartItemQty.classList.add('text-muted');
    cartItemQty.innerText = `QTY: ${quantity}`;
    div.append(cartItemName, cartItemQty);
    cartItemPrice.classList.add('text-muted');
    cartItemPrice.innerText = `₱${price}`;
    cartItem.append(div, cartItemPrice);
    checkoutCart.append(cartItem);
    sendToTable(productName, price, quantity);
  }
  let cartItems = document.querySelectorAll('.cart-item');
  document.querySelector('#cartSize').innerText = cartItems.length;
  let cartPreviewTotal = document.querySelector('#prevTotal');
  let total = sessionStorage.getItem('total');
  cartPreviewTotal.innerText = `₱${total}`;
  savePurchases();
}

function sendToTable(name, price, quantity) {
  let summary = document.querySelector('#cartSummary');
  let items = document.createElement('tr');
  // Table contents
  let productName = document.createElement('td');
  let productQty = document.createElement('td');
  let productPrice = document.createElement('td');
  let totalPrice = document.createElement('td');
  productQty.classList.add('text-center');
  productPrice.classList.add('text-right');
  totalPrice.classList.add('text-right');
  productName.innerText = name;
  productQty.innerText = quantity;
  productPrice.innerText = `₱${price}`;
  totalPrice.innerText = `₱${(price * quantity)}`;
  items.append(productName, productQty, productPrice, totalPrice);
  summary.append(items);
}
const updateGrandTotal = () => {
  let total = sessionStorage.getItem('total');
  let shipFee = document.querySelector('#shipFeeFinal').innerText;
  document.getElementById('grandTotal').innerText = `₱${(parseFloat(total) + parseFloat(shipFee))}`;
}

function savePurchases() {
  // Saves purchases to db
  let purchases = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    if (sessionStorage.key(i) == 'total') continue;
    let productName = sessionStorage.key(i);
    let object = sessionStorage.getItem(productName);
    let objectFinal = JSON.parse(object);

    let price = objectFinal.productPrice;
    let id = objectFinal.productID;
    let quantity = objectFinal.quantity;
    let newObj = { 'productID': id, 'product': productName, 'price': parseFloat(price), 'qty': parseInt(quantity) };
    purchases.push(newObj);
  }
  let purchasesFinal = JSON.stringify(purchases);
  document.querySelector('#purchases').value = purchasesFinal;
}