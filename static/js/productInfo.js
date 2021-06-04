let feedbackSection = document.querySelector('.feedback-section');
let feedbacks = document.getElementsByClassName('username');
document.querySelector('#reviewNumbers').innerHTML = feedbacks.length;
if (feedbacks < 1) {
    feedbackSection.innerHTML = '<p class ="mb-5">No reviews yet.</p>';
}