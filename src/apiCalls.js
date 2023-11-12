import { trips } from "./scripts";

export const travelersEndpoint = `http://localhost:3001/api/v1/travelers`;
export const singleTravelerEndpoint = `http://localhost:3001/api/v1/travelers/${1}/`;
export const tripsEndpoint = `http://localhost:3001/api/v1/trips`;
export const destinationsEndpoint = `http://localhost:3001/api/v1/destinations`;

const errorMessage = document.querySelector(".error");
const form = document.querySelector('.form-container')

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
      if (error instanceof TypeError){
        form.classList.add('hidden');
        errorMessage.innerText = "!! Unable to connect to the server.    Please try again later.";
        errorMessage.classList.remove("hidden");
      }
      else {
        alert(error.message);
      }
  })
);

export const postReq = (data) => {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    if(!response.ok) {
      throw new Error (`${response.status} - Failed to fetch data.`)
    }
    return response.json()
  })
  .then(json => {
    trips.push(json);
    console.log(trips, `inside POST func`);
  })
}

export const sendData = (currentData) => {
  let duration = parseInt(du)
}