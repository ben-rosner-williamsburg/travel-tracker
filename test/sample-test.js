import { expect, use } from 'chai';
import { filterData, getDataByIndex, getRandomTraveler, getTripDates } from '../src/dataModel';
import sampleTravelers  from './sample-travelers-test.js';
import sampleTrips from './sample-trips-test.js'
import sampleDestinations from "./sample-destinations-test.js"

describe('See if the tests are running', function() {
  it('should return true', function() {
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

describe('getRandomTraveler', function() {
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

describe('getDataByIndex', function() {
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
  describe('filterData', function() {
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
describe('getTripDates', function() {
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