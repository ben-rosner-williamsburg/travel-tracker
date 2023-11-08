export const travelers = "http://localhost:3001/api/v1/travelers";
export const singleTraveler = `http://localhost:3001/api/v1/travelers/${id}`;
export const trips = "http://localhost:3001/api/v1/trips";
export const destinations = "http://localhost:3001/api/v1/destinations";

const endpoints = [travelers, singleTraveler, trips, destinations];

export const fetchPromises = endpoints.map(url => {
  fetch(url).then((response) => {
     if (!response.ok) {
      throw new Error(`${response.status} : "Failed to fetch data`);
     }
     return response.json();
  }).then((data) => {
      return data;
  }).catch(error => {
      console.error(error);
  })
})
