export const getRandomTraveler = travelers => {
  const travelerInd = Math.floor(Math.random() * travelers.length)
  return travelerInd;
}

export const getTravelerData = (travelers, index) => {
    const selectedTraveler = travelers.find(traveler => {
      return traveler.id === index + 1;
    })
    return selectedTraveler;
}

export const getTrips = (selectedTraveler, trips) => {
      const tripsPerTraveler = trips.filter(trip => {
        return selectedTraveler.id === trip.userID
     })
    return tripsPerTraveler;
}