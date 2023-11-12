// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { fetchPromises } from './apiCalls';
import { getRandomTraveler, getDataByIndex, filterData, getTripDates, getDestinationIDs, findDestination, getLodgingCost, getFlightCost, getTotalCost} from './dataModel';
import { displayName, displayTrips } from './dom';


export let travelers;
export let singleTraveler;
export let trips;
export let destinations;
window.addEventListener("load", function() {  
Promise.all(fetchPromises).then((data) => {
    travelers = data[0].travelers;
    singleTraveler = data[1];
    trips = data[2].trips;
    destinations = data[3].destinations;


    const randomTravelerIndex = getRandomTraveler(travelers);
    const travelerData = getDataByIndex(travelers, randomTravelerIndex);
    const filterForTrips = filterData(travelerData, trips)
    const tripDates = getTripDates(filterForTrips);
    const destinationIDs = getDestinationIDs(filterForTrips);
    const location = findDestination(destinationIDs, destinations);
    const lodgingCosts = getLodgingCost(destinationIDs, filterForTrips, destinations);
    const flightCosts = getFlightCost(destinationIDs, filterForTrips, destinations);
    const totalCost = getTotalCost(lodgingCosts, flightCosts);
    displayName(travelerData)
    displayTrips(tripDates, location)
  })
})