export const getId = (username) => {
  const splitUsernameId = username.value.split("traveler");
  const id = parseInt(splitUsernameId[1]);
  return id;
}

export const filterData = (selectedTravelerData, tripData) => {
  const travelerData = tripData.filter(data => {
    return selectedTravelerData.id === data.userID;
  })
  return travelerData;
}

export const getTripDates = tripsPerTraveler => {
  const tripDate = tripsPerTraveler.map(trip => {
    return trip.date;
  })
  return tripDate;
}

export const getDestinationIDs = (tripData) => {
  const destinationIDs = tripData.map(location => {
    return location.destinationID;
  })
  return destinationIDs;
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
      return id === destination.id;
    })
    return destination;
  })
  const lodgingCost = filterForDestination.map(destination => {
    return destination.estimatedLodgingCostPerDay;
  })
  const duration = trips.map(trip => {
    return trip.duration;
  })
  const allLodgingCosts = lodgingCost.reduce((totalLodgingCosts, lodgingCost) => {
    duration.forEach(tripDuration => {
      totalLodgingCosts += (lodgingCost * tripDuration);
    })
    return totalLodgingCosts;
  }, 0)
  return allLodgingCosts;
}

export const getFlightCost = (selectedDestinations, trips, destinationData) => {
  const filterForDestination = selectedDestinations.map(id => {
    const destination = destinationData.find(destination => {
      return id === destination.id;
    })
    return destination;
  })
  const flightCost = filterForDestination.map(destination => {
    return destination.estimatedFlightCostPerPerson;
  })
  const numOfTravelers = trips.map(trip => {
    return trip.travelers;
  })
  const allFlightCosts = flightCost.reduce((totalFlightCosts, flightCost) => {
    numOfTravelers.forEach(flights => {
      totalFlightCosts += flightCost * flights;
    })
    return totalFlightCosts;
  }, 0)
  return allFlightCosts;
}

export const getTotalCost = (allLodgingCosts, allFlightCosts) => {
  let initialCost = allLodgingCosts + allFlightCosts;
  let initialCostFees = initialCost * .10;
  const totalCostWithFees = initialCost + initialCostFees;
  const roundedCost = Math.round(totalCostWithFees);
  return roundedCost;
}

export const getNewData = (dataset) => {
  const sortedData = dataset.sort((a, b) => new Date(a.date) - new Date(b.date));
  return [sortedData[dataset.length - 1]];
}
