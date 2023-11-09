import { destinationsEndpoint } from "./apiCalls";
import { destinations, travelers } from "./scripts";

export const getRandomTraveler = travelers => {
  const travelerInd = Math.floor(Math.random() * travelers.length)
  return travelerInd;
}

export const getDataByIndex = (data, index) => {
  const selectedTraveler = data.find(data => {
    return data.id === index + 1;
  })
  return selectedTraveler;
}

export const filterData = (selectedData, data, id) => {
  const travelerData = data.filter(data => {
    return selectedData.id === data[id]
  })
  return travelerData;
}

export const getTripDates = tripsPerTraveler => {
  return tripsPerTraveler.map(trip => {
    return trip.date;
  })
}

export const getDestinationIDs = (tripData) => {
  const destinationIDs = tripData.map(location => {
    return location.destinationID
  })
  return destinationIDs
}

export const findDestination = (destinationIDs, destinationData) => {
  const destinations = destinationIDs.map(id => {
    const destination = destinationData.find(destination => {
      return id === destination.id;
    })
    return destination.destination;
  })
  return destinations;
}


export const getLodgingCost = (selectedDestinations, trips, destinationData) => {
  const filterForDestination = selectedDestinations.map(id => {
    const destination = destinationData.find(destination => {
      return id === destination.id
    })
    return destination
  })
  const lodgingCost = filterForDestination.map(destination => {
    return destination.estimatedLodgingCostPerDay
  })
  const duration = trips.map(trip => {
    return trip.duration
  })
  const allLodgingCosts = lodgingCost.reduce((totalLodgingCosts, lodgingCost) => {
    duration.forEach(tripDuration => {
      totalLodgingCosts += lodgingCost * tripDuration
    })
    return totalLodgingCosts
  }, 0)
  return allLodgingCosts
}