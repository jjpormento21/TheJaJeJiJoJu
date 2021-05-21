//Tooltip
$(function () {
<<<<<<< HEAD
    $('[data-toggle="tooltip"]').tooltip()
  });
=======
  $('[data-toggle="tooltip"]').tooltip()
})

function setPostToDelete(productId) {
  document.querySelector(".delete-post-btn").setAttribute("href", '/admin/delete_product/' + productId);
  console.log(postId);
}
>>>>>>> about-us
