//Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

const navLinks = $(".nav-link");
const pageData = $("#page-data").data();

console.log(pageData);
$(navLinks[pageData.pageid]).addClass("nav-active");

const changeIcon = (e) => {
  let button = e.target;
  if (button.classList.contains('bi-chevron-down')){
    button.classList.remove('bi-chevron-down');
    button.classList.add('bi-chevron-up');
  }
  else if (button.classList.contains('bi-chevron-up')){
    button.classList.remove('bi-chevron-up');
    button.classList.add('bi-chevron-down');
    console.log(e.target);
  }
}

const collapseButtons = document.querySelectorAll('.card-button');
for (const button of collapseButtons) {
  button.addEventListener('click', changeIcon);
}