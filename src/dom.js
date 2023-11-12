const nameField = document.querySelector(".name");
const tripContainer = document.querySelector(".trip-data")
const tripsField = document.querySelector('.trips');
const locationsField = document.querySelector('.location')
const moneySpentField = document.querySelector(".money-spent");


export const displayName = (selectedUser) => {
  nameField.innerText = `Welcome ${selectedUser.name}!`
}

export const displayTrips = (trips, locations) => {
   trips.forEach(trip => {
      tripsField.innerHTML += `<h1 class="trips">${trip} - </h1>`
   })
   locations.forEach(location => {
    locationsField.innerHTML += `<h1 class="location"> ${location}</h1>`
   })
}

export const displayMoneySpent = (money) => {
  moneySpentField.innerText = `Total Spent: $${money}`
}