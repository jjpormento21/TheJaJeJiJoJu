window.onload = function () {
    var feedbackSection = document.querySelector('#feedbackSection');
    var feedbacks = document.getElementsByClassName('username');
    document.querySelector('#reviewNumbers').innerText = feedbacks.length;
    if (feedbacks.length < 1) {
        feedbackSection.innerText = 'No reviews yet.';
    }
}