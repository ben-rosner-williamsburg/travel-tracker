const nameField = document.querySelector(".name");
const tripsField = document.querySelector('.trips');
const locationField = document.querySelector('.location')
const moneySpentField = document.querySelector(".money-spent");

export const displayUserTrips = (selectedUser, trips, location, totalCost) => {
  nameField.innerText = `Welcome ${selectedUser.name}!`;
  tripsField.innerText = `Trip Dates: ${trips}`
  locationField.innerText = `Location of Trips: ${location}`
  moneySpentField.innerText = `Total Cost of Trips: $${totalCost}`
}