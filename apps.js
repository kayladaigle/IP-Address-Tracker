var map = L.map('map').setView([32.7688, -96.808777], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([51.5, -0.09]).addTo(map);

let latitude;
let longitude;
//Get Users IP or domain input
document.getElementById('searchButton').addEventListener('click',() => {
const inputFieldValue = document.getElementById('inputField').value;
const apiKey = 'at_fKM1KgY13rKLKOYlrQ5m25oGzUXIk';

const ipAddressRegex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/;

let apiUrl;

if(ipAddressRegex.test(inputFieldValue)) {
  apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_fKM1KgY13rKLKOYlrQ5m25oGzUXIk&ipAddress=${inputFieldValue}`;
} else {
  apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&domain=${inputFieldValue}`;
}

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
      // Extract relevant data from the API response
      const ipAddress = data.ip;
      const location = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
      const isp = data.isp;
      const timezone = data.location.timezone;
      const domainName = data.domains;
      latitude = data.location.lat;
      longitude = data.location.lng;

        // Display the data on the webpage
        document.getElementById('ipAddress').textContent = ipAddress;
        document.getElementById('location').textContent = location;
        document.getElementById('isp').textContent = isp;
        document.getElementById('timezone').textContent = timezone;

        map.setView([latitude,longitude],8);
        L.marker([latitude,longitude]).addTo(map);
      })

      .catch(error => {
        console.error('Error:', error);
      });

});
