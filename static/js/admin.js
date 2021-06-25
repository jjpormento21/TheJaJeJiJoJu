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

var tableRecord = document.querySelector('.records');
var search = document.querySelector('.searchBar');
search.addEventListener('keyup', filterItems);

function filterItems(e) {
    // Convert to lowercase
    let text = e.target.value.toLowerCase();
    let tableItems = tableRecord.querySelectorAll('tr');
    Array.from(tableItems).forEach(function (item){
        var itemName = item.innerText;
        if (itemName.toLowerCase().indexOf(text) !=-1){
            item.style.display = '';
        }
        else{
            item.style.display = 'none';
        }
    })

}