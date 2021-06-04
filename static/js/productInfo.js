let feedbackSection = document.querySelector('.feedback-section');
let feedbacks = document.getElementsByClassName('username').length;
document.querySelector('.badge').innerHTML = feedbacks;
if (feedbacks < 1) {
    feedbackSection.innerHTML = '<p class ="mb-5">No reviews yet.</p>';
}