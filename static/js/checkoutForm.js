// Input Fields: Checkout
console.log('Hello World!');
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

var formSections = document.getElementsByClassName('form-step');
formSections[0].style.display = 'block';

var checkoutNavbarList = document.getElementsByClassName('tab-checkout');
console.log(checkoutNavbarList);

let nextButtons = document.getElementsByClassName('nextStep');
console.log(nextButtons);

let prevButtons = document.getElementsByClassName('prevStep');
console.log(prevButtons);

// Other tabs are disabled by default
for (let i=0; i<checkoutNavbarList.length; i++){
    let navLink = checkoutNavbarList[i];
    if (i==0){
        navLink.classList.add('active');
        navLink.classList.add('text-primary', 'font-weight-bold');
    }
    else{
        navLink.classList.add('disabled');
    }
}

for (let i=0; i<nextButtons.length; i++){
    let nextButton = nextButtons[i];
    nextButton.addEventListener('click', nextPaymentStep);
}
for (let i=0; i<prevButtons.length; i++){
    let prevButton = prevButtons[i];
    prevButton.addEventListener('click', prevPaymentStep);
}

function nextPaymentStep(){
    stepCounter +=1;
    checkoutNavbarList[stepCounter-1].classList.remove('active', 'font-weight-bold');
    checkoutNavbarList[stepCounter-1].classList.add('disabled', 'text-success');
    checkoutNavbarList[stepCounter].classList.add('active', 'text-primary', 'font-weight-bold');
    formSections[stepCounter].style.display = 'block';
    formSections[stepCounter-1].style.display = 'none';
}

function prevPaymentStep(){
    stepCounter-=1;
    checkoutNavbarList[stepCounter].classList.add('text-primary','active', 'font-weight-bold');
    checkoutNavbarList[stepCounter+1].classList.remove('active', 'font-weight-bold');
    checkoutNavbarList[stepCounter+1].classList.remove('text-success');
    checkoutNavbarList[stepCounter+1].classList.add('disabled', 'text-primary');
    formSections[stepCounter].style.display = 'block';
    formSections[stepCounter+1].style.display = 'none';
}

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