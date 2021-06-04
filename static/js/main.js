//Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

const navLinks = $(".nav-link");
const pageData = $("#page-data").data();

console.log(pageData);
$(navLinks[pageData.pageid]).addClass("nav-active");

let trackNum = document.getElementById('trackNum');

// program to generate random strings
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
trackNum.innerHTML = generateString(9);

function setPostToDelete(postId) {
  document.querySelector(".delete-post-btn").setAttribute("href", '/blog_post_delete/' + postId);
  console.log(postId);
}
