import { filterData, findDestination, getDestinationIDs, getFlightCost, getLodgingCost, getNewData, getRandomTraveler, getTotalCost } from "./dataModel";
import { clearDashboard, displayNewTripPrice, displayTrips, displayMoneySpent } from "./dom";
import { travelerData, destinations, trips, totalCost, id, singleTraveler } from "./scripts";


const travelersEndpoint = `http://localhost:3001/api/v1/travelers`;
const tripsEndpoint = `http://localhost:3001/api/v1/trips`;
const destinationsEndpoint = `http://localhost:3001/api/v1/destinations`;

const errorMessage = document.querySelector(".error");
const form = document.querySelector('.form-container')

let dataArr = [];

export const endpoints = [travelersEndpoint, tripsEndpoint, destinationsEndpoint];

export const fetchPromises = endpoints.map(endpoint =>
  fetch(endpoint).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} : "Failed to fetch data`);
    }
    return response.json();
  }).then((data) => {
    console.log(data)
    return data;
  }).catch(error => {
    if (error instanceof TypeError) {
      form.classList.add('hidden');
      errorMessage.innerText = "!! Unable to connect to the server.    Please try again later.";
      errorMessage.classList.remove("hidden");
    }
    else {
      console.error(error.message);
    }
  })
);

 export const fetchSingleTraveler = id => 
  fetch(`http://localhost:3001/api/v1/travelers/${id}`).then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} : "Failed to fetch data`);
      }
      return response.json();
    }).then((data) => {
      console.log(data)
      return data;
    }).catch(error => {
      if (error instanceof TypeError) {
        form.classList.add('hidden');
        errorMessage.innerText = "!! Unable to connect to the server.    Please try again later.";
        errorMessage.classList.remove("hidden");
      }
      else {
        console.error(error.message);
      }
    })

export const postReq = (data) => {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - Failed to fetch data.`)
      }
      return response.json()
    })
    .then(json => {
      clearDashboard()
      trips.push(json.newTrip);
      const newTripData = filterData(singleTraveler, trips);
      const newTrip = getNewData(newTripData);
      const destinationID = getDestinationIDs(newTripData);
      const newDestinationID = getDestinationIDs(newTrip);
      const locations = findDestination(destinationID, destinations);
      const lodgingCost = getLodgingCost(newDestinationID, newTrip, destinations);
      const flightCost = getFlightCost(newDestinationID, newTrip, destinations);
      const totalCostOfNewTrip = getTotalCost(lodgingCost, flightCost);
      const totalCostOfAllTrips = totalCostOfNewTrip + totalCost;
      displayTrips(newTripData, locations);
      displayNewTripPrice(totalCostOfNewTrip);
      displayMoneySpent(totalCostOfAllTrips);
    })
    .catch(error => {
      console.error(error.message)
    })
}

export const sendData = (currentData, trips) => {
  let tripDuration = parseInt(duration.value)
  let id = trips.length + 1
  if (!isNaN(new Date(date.value)) && !isNaN(tripDuration) && tripDuration <= 30 && tripDuration) {
    const payload = {
      id: id,
      userID: currentData.id,
      destinationID: parseInt(destinationPicker.value),
      travelers: parseInt(numberTravelers.value),
      date: date.value,
      duration: tripDuration,
      status: "pending",
      suggestedActivities: []
    }
    postReq(payload);
    return payload;
  }
  else {
    errorMessage.classList.toggle("hidden");
    errorMessage.innerText = "One or more was inputted incorrectly: Incorrect date format and/or number out of range"
  }
}