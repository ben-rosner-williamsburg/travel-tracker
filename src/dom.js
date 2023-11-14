const nameField = document.querySelector(".name");
const tripsField = document.querySelector('.trips');
const locationsField = document.querySelector('.location')
const moneySpentField = document.querySelector(".money-spent");
const newTripPriceField = document.querySelector(".new-trip-price");
const statusField = document.querySelector(".status");


export const displayName = (selectedUser) => {
  nameField.innerText = `Welcome ${selectedUser.name}!`;
}

export const clearDashboard = () => {
  tripsField.innerHTML = "";
  locationsField.innerHTML = "";
  statusField.innerHTML = "";
}
export const displayTrips = (trips, destinations) => {
  trips.forEach(trip => {
    tripsField.innerHTML += `<h1 class="trips"> ${trip.date} </h1>`;
    statusField.innerHTML += `<h1 class="status"> (${trip.status}) </h1>`;
  })
  destinations.forEach(destination => {
    locationsField.innerHTML += `<h1 class="location"> ${destination} </h1>`;
  })
}

export const displayMoneySpent = (money) => {
  moneySpentField.innerText = `Total Spent: $${money}`;
}

export const displayNewTripPrice = (money) => {
  newTripPriceField.innerText = `This trip will cost you $${money}`;
}
