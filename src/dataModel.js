export const getRandomTraveler = travelers => {
  const travelerInd = Math.floor(Math.random() * travelers.length)
  return travelerInd;
}