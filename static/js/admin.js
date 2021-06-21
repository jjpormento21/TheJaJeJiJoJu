function setReviewToDelete(itemId) {
    document.querySelector(".delete-post-btn").setAttribute("href", '/admin/delete_review/' + itemId);
    console.log(itemId);
}

function setProductToDelete(itemId) {
    document.querySelector(".delete-post-btn").setAttribute("href", '/admin/delete_product/' + itemId);
    console.log(itemId);
}

function setRecordToDelete(itemId) {
    document.querySelector(".delete-post-btn").setAttribute("href", '/admin/delete_record/' + itemId);
    console.log(itemId);
}