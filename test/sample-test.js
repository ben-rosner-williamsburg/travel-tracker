import { expect } from 'chai';
import { filterData, findDestination, getDestinationIDs, getLodgingCost, getFlightCost, getTotalCost } from '../src/dataModel';
import sampleTravelers from './sample-travelers-test.js';
import sampleTrips from './sample-trips-test.js'
import sampleDestinations from "./sample-destinations-test.js"

describe('See if the tests are running', function () {
  it('should return true', function () {
    expect(true).to.equal(true);
  });
});

let travelers = sampleTravelers;
let trips = sampleTrips;
let destinations = sampleDestinations;
let singleTraveler = travelers[0];
let travelerData = singleTraveler;

beforeEach(() => {
  travelers = sampleTravelers;
  trips = sampleTrips;
  destinations = sampleDestinations;
  singleTraveler = travelers[0];
  travelerData = singleTraveler;
});


describe('filterData', function () {
  it('should return trip data based on user ID', () => {
    const tripData = filterData(travelerData, trips)
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
  it('should be an array of object data', () => {
    const tripData = filterData(travelerData, trips);
    expect(tripData).to.be.an("array");
  })
})
describe('getDestinationIDs', function () {
  it('should return the destination ID of a given trip', () => {
    const tripData = filterData(travelerData, trips);
    const destinationIDs = getDestinationIDs(tripData);
    expect(destinationIDs).to.deep.equal([trips[0].destinationID]);
  })
  it('should be an array of numbers', () => {
    const tripData = filterData(travelerData, trips);
    const destinationIDs = getDestinationIDs(tripData);
    expect(destinationIDs).to.be.an("array");
  })
})
describe('findDestination', function () {
  it('should return a destination name when given an ID', () => {
    const tripData = filterData(travelerData, trips);
    const destinationIDs = getDestinationIDs(tripData);
    const location = findDestination(destinationIDs, destinations);
    expect(location).to.deep.equal(['Lima, Peru']);
  })
  it('should be an array', () => {
    const tripData = filterData(travelerData, trips);
    const destinationIDs = getDestinationIDs(tripData);
    const location = findDestination(destinationIDs, destinations);
    expect(location).to.be.an("array");
  })
})
describe('lodgingCosts', function () {
  let tripData;
  let destinationIDs;
  beforeEach(() => {
    tripData = filterData(travelerData, trips);
    destinationIDs = getDestinationIDs(tripData);
  })
  it('should return the total amount of lodging costs for a destination', () => {
    const lodgingCost = getLodgingCost(destinationIDs, tripData, destinations)
    expect(lodgingCost).to.equal(1050);
  })
  it('should be a number', () => {
    const lodgingCost = getLodgingCost(destinationIDs, tripData, destinations);
    expect(lodgingCost).to.be.a("number");
  })
})
describe('flightCosts', function () {
  let tripData;
  let destinationIDs;
  beforeEach(() => {
    tripData = filterData(travelerData, trips);
    destinationIDs = getDestinationIDs(tripData);
  })
  it('should return the total amount of flight costs for a destination', () => {
    const flightCost = getFlightCost(destinationIDs, tripData, destinations)
    expect(flightCost).to.equal(1200);
  })
  it('should be a number', () => {
    const flightCost = getLodgingCost(destinationIDs, tripData, destinations);
    expect(flightCost).to.be.a("number");
  })
})
describe('getTotalCost', function () {
  let tripData;
  let destinationIDs;
  let lodgingCost;
  let flightCost;
  beforeEach(() => {
    tripData = filterData(travelerData, trips);
    destinationIDs = getDestinationIDs(tripData);
    lodgingCost = getLodgingCost(destinationIDs, tripData, destinations)
    flightCost = getFlightCost(destinationIDs, tripData, destinations)
  })
  it('should return the total amount of costs for a destination', () => {
    const totalCost = getTotalCost(lodgingCost, flightCost)
    expect(totalCost).to.equal(2475);
  })
  it('should be a number', () => {
    const totalCost = getTotalCost(lodgingCost, flightCost);
    expect(totalCost).to.be.a("number");
  })
})