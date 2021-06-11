//Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

const navLinks = $(".nav-link");
const pageData = $("#page-data").data();

console.log(pageData);
$(navLinks[pageData.pageid]).addClass("nav-active");
