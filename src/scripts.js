// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import { fetchPromises, sendData } from './apiCalls';
import { getRandomTraveler, getDataByIndex, filterData, getTripDates, getDestinationIDs, findDestination, getLodgingCost, getFlightCost, getTotalCost, getNewData} from './dataModel';
import { displayMoneySpent, displayName, displayTrips, submitButton } from './dom';


export let travelers;
export let singleTraveler;
export let trips;
export let destinations;
export let travelerData;
export let totalCost;

const submit = document.querySelector('#submitButton')

window.addEventListener("load", function() {  
Promise.all(fetchPromises).then((data) => {
    travelers = data[0].travelers;
    singleTraveler = data[1];
    trips = data[2].trips;
    destinations = data[3].destinations;
    
    getNewData(trips)
    const randomTravelerIndex = getRandomTraveler(travelers);
    travelerData = getDataByIndex(travelers, randomTravelerIndex);
    const filterForTrips = filterData(travelerData, trips)
    const destinationIDs = getDestinationIDs(filterForTrips);
    const location = findDestination(destinationIDs, destinations);
    const lodgingCosts = getLodgingCost(destinationIDs, filterForTrips, destinations);
    const flightCosts = getFlightCost(destinationIDs, filterForTrips, destinations);
    totalCost = getTotalCost(lodgingCosts, flightCosts);
    displayName(travelerData)
    displayTrips(filterForTrips, location)
    displayMoneySpent(totalCost)
  })
})

submit.addEventListener("click", function(event){
  event.preventDefault();
  sendData(travelerData, trips);
})