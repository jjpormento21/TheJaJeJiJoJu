window.onload = function () {
    var feedbackSection = document.querySelector('#feedbackSection');
    var feedbacks = document.getElementsByClassName('username');
    document.querySelector('#reviewNumbers').innerHTML = feedbacks.length;
    if (feedbacks.length < 1) {
        feedbackSection.innerHTML = 'No reviews yet.';
    }
}