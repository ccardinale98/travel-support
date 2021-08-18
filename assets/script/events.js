var btnMainEl = document.getElementById("btn-main");
var flightDivEl = document.getElementById("flight-div");
var weatherDivEl = document.getElementById("weather-div");
var arrivalInputEl = document.getElementById('arrival-input');
var departureInputEl = document.getElementById('departure-input');

btnMainEl.addEventListener("click", showApiData);

function showApiData(event) {
  event.preventDefault();
  
  var arrivalDate = arrivalInputEl.value + 'T00:00:00Z'
  var departureDate = departureInputEl.value + 'T23:59:59Z'
  var destinationEl = document.getElementById("destination");
  var citySearch = destinationEl.value;
  console.log(citySearch);

  if (citySearch === "") {
    console.log("empty destination");
    var noDestinationWeather = document.createElement("h3");
    noDestinationWeather.textContent =
      "Please include a city name in the destination field!";
    var noDestinationEvent = document.createElement("h3");
    noDestinationEvent.textContent =
      "Please include a city name in the destination field!";
    flightDivEl.append(noDestinationEvent);
    weatherDivEl.append(noDestinationWeather);
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
        eventAlert.textContent = "NO LOCAL EVENTS IN THE NEAR FUTURE";
        flightDivEl.append(eventAlert);
      }
      console.log(data._embedded.events);
      var mainData = data._embedded.events;
      for (var i = 0; i < mainData.length; i++) {
        var eventName = document.createElement("h5");
        var startDate = document.createElement("p2");
        var eventStatus = document.createElement("p2");
        var eventLink = document.createElement("p3");
        var section1 = document.createElement("section");
        var section2 = document.createElement("section");

        eventName.textContent = mainData[i].name;
        startDate.textContent = "Date: " + mainData[i].dates.start.localDate;
        eventStatus.textContent = "Status: " + mainData[i].dates.status.code;
        eventLink.textContent = mainData[i].url;

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
