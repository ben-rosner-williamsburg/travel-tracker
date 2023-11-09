const nameField = document.querySelector(".name");
const tripsField = document.querySelector('.trips');
const moneySpentField = document.querySelector(".money-spent");

export const displayUserTrips = (selectedUser, trips, location, moneySpent) => {
  nameField.innerText = `${selectedUser.name}`;
  tripsField.innerText = `${trips} ${location}`;
}