const nameField = document.querySelector(".name");
const tripsField = document.querySelector('.trips');
const locationsField = document.querySelector('.location')
const moneySpentField = document.querySelector(".money-spent");

export const displayName = (selectedUser) => {
  nameField.innerText = `Welcome ${selectedUser.name}!`
}

export const clearDashboard = () => {
  tripsField.innerHTML = "";
  locationsField.innerHTML = ""
}
export const displayTrips = (trips, locations) => {
   trips.forEach(trip => {
      tripsField.innerHTML += `<h1 class="trips">${trip} - </h1>`
   })
   locations.forEach(location => {
    locationsField.innerHTML += `<h1 class="location"> ${location}</h1>`
   })
}

export const appendTrip = (newTrip, newLocation) => {
  tripsField.innerHTML += `<h1 class="trips">${newTrip} - </h1>`
  locationsField.innerHTML += `<h1 class="location> ${newLocation}</h1>`
}
export const displayMoneySpent = (money) => {
  moneySpentField.innerText = `Total Spent: $${money}`
}