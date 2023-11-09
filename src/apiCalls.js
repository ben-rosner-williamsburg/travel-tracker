import { singleTraveler, travelerData } from "./scripts";

export const travelersEndpoint = `http://localhost:3001/api/v1/travelers`;
export const singleTravelerEndpoint = `http://localhost:3001/api/v1/travelers/${1}/`;
export const tripsEndpoint = `http://localhost:3001/api/v1/trips`;
export const destinationsEndpoint = `http://localhost:3001/api/v1/destinations`;

export const endpoints = [travelersEndpoint, singleTravelerEndpoint, tripsEndpoint, destinationsEndpoint];

export const fetchPromises = endpoints.map(endpoint => 
  fetch(endpoint).then((response) => {
     if (!response.ok) {
      throw new Error(`${response.status} : "Failed to fetch data`);
     }
     return response.json();
  }).then((data) => {
      return data;
  }).catch(error => {
      console.error(error);
  })
)
