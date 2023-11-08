export const travelers = `http://localhost:3001/api/v1/travelers`;
export const singleTraveler = `http://localhost:3001/api/v1/travelers/${1}/`;
export const trips = `http://localhost:3001/api/v1/trips`;
export const destinations = `http://localhost:3001/api/v1/destinations`;

export const endpoints = [travelers, singleTraveler, trips, destinations];

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
