var btnMainEl = document.getElementById("btn-main");
var flightDivEl = document.getElementById("flight-div");
var weatherDivEl = document.getElementById("weather-div");
var arrivalInputEl = document.getElementById('arrival-input');
var departureInputEl = document.getElementById('departure-input');

btnMainEl.addEventListener('click', function () {
  flightDivEl.innerHTML = ''
  var h2ElEvents = document.createElement('h2')
  h2ElEvents.textContent = 'Local Events: '
  flightDivEl.append(h2ElEvents);
})

btnMainEl.addEventListener('click', function () {
  weatherDivEl.innerHTML = ''
  var h2ElWeather = document.createElement('h2')
  h2ElWeather.textContent = 'Weather Forecast: '
  weatherDivEl.append(h2ElWeather);
})

btnMainEl.addEventListener("click", showApiData);


function showApiData(event) {
  event.preventDefault();
  var arrivalDate = arrivalInputEl.value + 'T00:00:00Z'
  var departureDate = departureInputEl.value + 'T23:59:59Z'
  var destinationEl = document.getElementById("destination");
  var citySearch = destinationEl.value;
  console.log(citySearch);

  if (citySearch === "" || arrivalInputEl.value === '' || departureInputEl.value === '') {
    console.log("empty field");
    $('#myModal').modal('toggle');
    return;
  }
  var requestUrl =
    "https://app.ticketmaster.com/discovery/v2/events.json?city=" +
    citySearch +
    "&startDateTime=" +
    arrivalDate +
    "&endDateTime=" +
    departureDate +
    "&apikey=jITHRBn97SIAoqceTdmAptHok8NWaIBv";

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then(function (data) {
      if (typeof data._embedded === "undefined") {
        console.log("this was undefined");
        var eventAlert = document.createElement("p2");
        eventAlert.textContent = "NO LOCAL EVENTS DURING TRIP";
        flightDivEl.append(eventAlert);
      }
      console.log(data._embedded.events);
      var mainData = data._embedded.events;
      for (var i = 0; i < mainData.length; i++) {
        var eventName = document.createElement("h5");
        var startDate = document.createElement("p2");
        var eventStatus = document.createElement("p2");
        var eventLink = document.createElement("a");
        var section1 = document.createElement("section");
        var section2 = document.createElement("section");

        eventName.textContent = mainData[i].name;
        startDate.textContent = "Date: " + mainData[i].dates.start.localDate;
        
        eventStatus.textContent = " | Status: " + mainData[i].dates.status.code;
        if (eventStatus.textContent === ' | Status: cancelled') {
          eventStatus.style.color = 'red';
        } else if (eventStatus.textContent === ' | Status: rescheduled') {
          eventStatus.style.color = 'orange';
        } else {
          eventStatus.style.color = 'green';
        }

        eventLink.textContent = mainData[i].url;
        eventLink.href = mainData[i].url;
        eventLink.title = 'link';
        
        flightDivEl.append(section1);
        flightDivEl.append(section2);

        section1.append(eventName);
        section1.append(startDate);
        section1.append(eventStatus);
        section2.append(eventLink);

        section2.style.marginBottom = "50px";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}