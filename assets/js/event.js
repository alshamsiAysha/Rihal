// fisrt retrieve events from Local Storage
function getEventsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('events')) || [];
  clearEventsFromLocalStorage();

}

// and calculate countdown timer
function calculateCountdown(eventDateTime) {
  const eventDate = new Date(eventDateTime);
  const now = new Date();
  const timeDiff = eventDate.getTime() - now.getTime();
  if (timeDiff < 0) return "Event has passed";
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return `${days} days remaining`;
}

// then render events into countdown timers
function renderEvents() {
  const eventsContainer = document.getElementById('events-container');
  eventsContainer.innerHTML = '';
  
  const eventsData = getEventsFromLocalStorage();
  
  eventsData.forEach(event => {
    const eventCardCol = document.createElement('div');
    eventCardCol.classList.add('col-lg-3', 'col-md-6', 'mb-4');

    const eventCard = document.createElement('div');
    eventCard.classList.add('card', 'h-100');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const eventName = document.createElement('h5');
    eventName.classList.add('card-title');
    eventName.textContent = event.name;

    const eventDateTime = `${event.date} ${event.time}`;
    const countdown = calculateCountdown(eventDateTime);
    const countdownDisplay = document.createElement('p');
    countdownDisplay.textContent = countdown;

    const eventDescription = document.createElement('p');
    eventDescription.classList.add('card-text');
    eventDescription.textContent = event.description;

    cardBody.appendChild(eventName);
    cardBody.appendChild(countdownDisplay);
    cardBody.appendChild(eventDescription);

    // to add img check if event uploed  image
    if (event.image) {
      const eventImage = document.createElement('img');
      eventImage.classList.add('card-img-top');
      eventImage.src = event.image;
      eventImage.alt = 'Event Image';
      cardBody.appendChild(eventImage);
    }

    eventCard.appendChild(cardBody);
    eventCardCol.appendChild(eventCard);
    eventsContainer.appendChild(eventCardCol);
  });
}

// then update events
function autoUpdateEvents() {
  renderEvents();
  // Update every 20 se to see from you fastly
  setTimeout(autoUpdateEvents, 20);
}

// auto-update event
renderEvents();
autoUpdateEvents();
