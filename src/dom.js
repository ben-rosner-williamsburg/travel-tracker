const nameField = document.querySelector(".name");
const tripsField = document.querySelector('.trips');
const locationsField = document.querySelector('.location')
const moneySpentField = document.querySelector(".money-spent");

export const displayUserTrips = (selectedUser, trips, location, totalCost) => {
  nameField.innerText = `Welcome ${selectedUser.name}!`;
  tripsField.innerHTML = `<h4>${trips}</h4>`
  locationsField.innerHTML = `<h4>${location}</h4>`
  moneySpentField.innerText = `Total Cost of Trips: $${totalCost}`;
}
