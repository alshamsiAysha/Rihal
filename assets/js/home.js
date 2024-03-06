
// fisrt add event in  Local storage
function addEventToLocalStorage(event) {
let events = JSON.parse(localStorage.getItem('events')) || [];
events.push(event);
localStorage.setItem('events', JSON.stringify(events));
}

// then make  image preview
function previewImage() {
const fileInput = document.getElementById('eventImage');
const imagePreview = document.getElementById('image-preview');

fileInput.addEventListener('change', function() {
const file = this.files[0];
if (file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    imagePreview.src = e.target.result;
    imagePreview.style.display = 'block';
  }
  reader.readAsDataURL(file);
}
});
}

//  and call  image function
previewImage();

//Do  form submission
document.getElementById('event-form').addEventListener('submit', function(event) {
event.preventDefault();

const eventName = document.getElementById('eventName').value;
const eventDate = document.getElementById('eventDate').value;
const eventTime = document.getElementById('eventTime').value;
const eventDescription = document.getElementById('eventDescription').value;
const eventImage = document.getElementById('eventImage').files[0]; // Assuming single file upload

// Then Convert image to base64-encoded string
const reader = new FileReader();
reader.onload = function(e) {
const newEvent = {
  name: eventName,
  date: eventDate,
  time: eventTime,
  description: eventDescription,
  image: e.target.result 
};
addEventToLocalStorage(newEvent);

// Redirect to home Page
window.location.href = 'home.html';
};
reader.readAsDataURL(eventImage);
});

