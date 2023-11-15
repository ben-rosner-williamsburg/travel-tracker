import './css/styles.css';
import { fetchPromises, fetchSingleTraveler, sendData } from './apiCalls';
import { filterData, getDestinationIDs, findDestination, getLodgingCost, getFlightCost, getTotalCost, getId } from './dataModel';
import { displayMoneySpent, displayName, displayTrips } from './dom';


export let travelers;
export let singleTraveler;
export let trips;
export let destinations;
export let travelerData;
export let totalCost;
export let id;

const submit = document.querySelector('#submitButton');
const username = document.querySelector('#usernameField');
const password = document.querySelector("#passwordField");
const loginForm = document.querySelector(".login-form");
const loginScreen = document.querySelector(".login-screen");
const dashboard = document.querySelector(".main-screen");


loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  id = getId(username);
  if (username.value === `traveler${id}` && password.value === `travel`) {
    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");
  }
  Promise.all([fetchSingleTraveler(id)]).then((data) => {
    singleTraveler = data[0];
    const filterForTrips = filterData(singleTraveler, trips);
    getNewData(filterForTrips);
    const destinationIDs = getDestinationIDs(filterForTrips);
    const location = findDestination(destinationIDs, destinations);
    const lodgingCosts = getLodgingCost(destinationIDs, filterForTrips, destinations);
    const flightCosts = getFlightCost(destinationIDs, filterForTrips, destinations);
    totalCost = getTotalCost(lodgingCosts, flightCosts);
    displayName(singleTraveler);
    displayTrips(filterForTrips, location);
    displayMoneySpent(totalCost);
  })
})

window.addEventListener("load", function () {
  Promise.all(fetchPromises).then((data) => {
    travelers = data[0].travelers;
    trips = data[1].trips;
    destinations = data[2].destinations;
  })
})

submit.addEventListener("click", function (event) {
  event.preventDefault();
  sendData(singleTraveler, trips);
})