import { destinationsEndpoint } from "./apiCalls";

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
    return destinations
}
