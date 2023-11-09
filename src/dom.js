const nameField = document.querySelector(".name");
const tripsField = document.querySelector('.trips');
const locationField = document.querySelector('.location')
const moneySpentField = document.querySelector(".money-spent");

export const displayUserTrips = (selectedUser, trips, location) => {
  nameField.innerText = `${selectedUser.name}`;
  tripsField.innerText = `${trips}`
  locationField.innerText = `${location} `
}