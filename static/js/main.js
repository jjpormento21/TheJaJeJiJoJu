//Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function setPostToDelete(productId) {
  document.querySelector(".delete-post-btn").setAttribute("href", '/admin/delete_product/' + productId);
  console.log(postId);
}