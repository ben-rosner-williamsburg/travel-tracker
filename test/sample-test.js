import { expect } from 'chai';
import { filterData, findDestination, getDataByIndex, getDestinationIDs, getLodgingCost, getRandomTraveler, getTripDates, getFlightCost, getTotalCost } from '../src/dataModel';
import sampleTravelers from './sample-travelers-test.js';
import sampleTrips from './sample-trips-test.js'
import sampleDestinations from "./sample-destinations-test.js"

describe('See if the tests are running', function () {
  it('should return true', function () {
    expect(true).to.equal(true);
  });
});

let travelers = sampleTravelers;
let trips = sampleTrips
let destinations = sampleDestinations
beforeEach(() => {
  travelers = sampleTravelers;
  trips = sampleTrips;
  destinations = sampleDestinations;
});

describe('getRandomTraveler', function () {
  it('should return a random traveler index', () => {
    const randomIndex = getRandomTraveler(travelers);

    expect(randomIndex).to.be.a("number");
    expect(randomIndex).to.be.at.least(0);
    expect(randomIndex).to.be.at.most(travelers.length - 1);
  });

  it('should return a random traveler object from the array', () => {
    const randomIndex = getRandomTraveler(travelers)
    const randomTraveler = travelers[randomIndex]

    expect(travelers).to.deep.include(randomTraveler);
  })
})

describe('getDataByIndex', function () {
  it('should return user data based on index position', () => {
    const indexPosition = 1;
    const userData = getDataByIndex(travelers, indexPosition);
    const expectedData = {
      "id": 2,
      "name": "Rachael Vaughten",
      "travelerType": "thrill-seeker",
    }
    expect(userData).to.deep.equal(expectedData);
  });
  it('should return undefined for an invalid index position', () => {
    const indexPosition = -1;
    const userData = getDataByIndex(travelers, indexPosition);
    expect(userData).to.deep.equal(undefined);
  });
  it('should return undefined for an empty user data array', () => {
    const indexPosition = 0;
    const userData = getDataByIndex([], indexPosition);
    expect(userData).to.equal(undefined);
  })
})
describe('filterData', function () {
  let travelerData = getDataByIndex(travelers, 0);
  beforeEach(() => {
    travelerData = getDataByIndex(travelers, 0);
  })
  it('should return trip data based on user ID', () => {
    const id = 1
    const tripData = filterData(travelerData, trips, id)
    const expectedData = [
      {
        "id": 117,
        "userID": 1,
        "destinationID": 28,
        "travelers": 3,
        "date": "2021/01/09",
        "duration": 15,
        "status": "approved",
        "suggestedActivities": []
      }
    ]
    expect(tripData).to.deep.equal(expectedData)
  })
  it('should return undefined if an id is invalid', () => {
    const id = 0;
    const tripData = filterData(travelers, trips, id);
    expect(tripData).to.deep.equal(undefined);
  })
})
describe('getTripDates', function () {
  it('should return an array with all trip dates for that traveler', () => {
    let travelerData = getDataByIndex(travelers, 2);
    beforeEach(() => {
      travelerData = getDataByIndex(travelers, 2);
    })
    const id = 3;
    const tripData = filterData(travelerData, trips, id);
    const tripDates = getTripDates(tripData);
    const expectedData = ["2022/05/22"];
    expect(tripDates).to.deep.equal(expectedData);
  })
  it('should return undefined if there are no trip dates found', () => {
    let travelerData = getDataByIndex(travelers, 3);
    beforeEach(() => {
      travelerData = getDataByIndex(travelers, 3);
    })
    const id = 4;
    const tripData = filterData(travelerData, trips, id);
    const tripDates = getTripDates(tripData);
    expect(tripDates).to.deep.equal([undefined]);
  })
})
describe('getDestinationIDs', function () {
  it('should return the destination ID of a given trip', () => {
    const travelerData = getDataByIndex(travelers, 2);
    const id = 3;
    const tripData = filterData(travelerData, trips, id);
    const destinationIDs = getDestinationIDs(tripData);
    expect(destinationIDs).to.deep.equal([trips[3].destinationID]);
  })
  it('should return undefined if there is no destination ID found', () => {
    const travelerData = getDataByIndex(travelers, 3);
    const id = 4;
    const tripData = filterData(travelerData, trips, id);
    const destinationIDs = getDestinationIDs(tripData);
    expect(destinationIDs).to.deep.equal([undefined]);
  })
})
describe('findDestination', function () {
  it('should return a destination name when given an ID', () => {
    const travelerData = getDataByIndex(travelers, 2);
    const id = 3;
    const tripData = filterData(travelerData, trips, id);
    const destinationIDs = getDestinationIDs(tripData);
    const location = findDestination(destinationIDs, destinations);
    expect(location).to.deep.equal(['Sydney, Austrailia'])
  })
  it('should return undefined if there is no destination associated with an ID', () => {
    const travelerData = getDataByIndex(travelers, 3);
    const id = 4;
    const tripData = filterData(travelerData, trips, id);
    const location = findDestination(undefined, destinations);
    expect(location).to.equal(undefined);
  })
})
describe('lodgingCosts', function() {
  let travelerData = getDataByIndex(travelers, 2);
  let id = 3
  let tripData = filterData(travelerData, trips, id);
  let destinationIDs = getDestinationIDs(tripData);
  beforeEach(() => {
    travelerData = getDataByIndex(travelers, 2);
    id = 3
    tripData = filterData(travelerData, trips, id);
    destinationIDs = getDestinationIDs(tripData);
  })
  it('should return the total amount of lodging costs for a destination', () => {
    const lodgingCost = getLodgingCost(destinationIDs, tripData, destinations)
    expect(lodgingCost).to.equal(2210);
  })
  it('should return undefined if it encounters a value that is improper', () => {
    const lodgingCost = getLodgingCost(undefined, tripData, destinations)
    expect(lodgingCost).to.equal(undefined)
  })
})
describe('flightCosts', function() {
  let travelerData = getDataByIndex(travelers, 2);
  let id = 3
  let tripData = filterData(travelerData, trips, id);
  let destinationIDs = getDestinationIDs(tripData);
  beforeEach(() => {
    travelerData = getDataByIndex(travelers, 2);
    id = 3
    tripData = filterData(travelerData, trips, id);
    destinationIDs = getDestinationIDs(tripData);
  })
  it('should return the total amount of flight costs for a destination', () => {
    const flightCosts = getFlightCost(destinationIDs, tripData, destinations)
    expect(flightCosts).to.equal(3800);
  })
  it('should return  undefined if it encounters a value that is improper', () => {
    const lodgingCost = getLodgingCost(undefined, tripData, destinations)
    expect(lodgingCost).to.equal(undefined)
  })
})
  describe('totalCost', function() {
    let lodgingCost = 2210;
    let flightCost = 3800;
    beforeEach(() => {
      lodgingCost = 2210;
      flightCost = 3800;
    })
    it('should return the total cost of all trips for a traveler', () => {
      const totalCost = getTotalCost(lodgingCost, flightCost)
      expect(totalCost).to.equal(6611);
    })
    it('should return undefined if it encounters a value that is improper', () => {
      const totalCost = getTotalCost(undefined, undefined)
      expect(totalCost).to.equal(undefined)
    })
})