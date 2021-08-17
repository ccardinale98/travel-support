var btnFlightsEl = document.getElementById('btn-flights')
var flightDivEl = document.getElementById('flight-div')

btnFlightsEl.addEventListener('click', showApiData);

function showApiData() {
    event.preventDefault()
    console.log('hello')

    var requestUrl = 'http://api.aviationstack.com/v1/flights?access_key=9ddb00655800291e57984740e1b0abc9'

    fetch(requestUrl)
        .then(function (response) {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data.data);
            var mainData = data.data
            for (var i = 0; i < mainData.length; i++) {
                var originAirport = document.createElement('h5');
                var destinationAirport = document.createElement('h5');
                var airlineName = document.createElement('p2');
                var flightNumber = document.createElement('p2');

                originAirport.textContent = 'Origin Airport: ' + mainData[i].departure.airport
                destinationAirport.textContent = 'Destination Airport: ' + mainData[i].arrival.airport
                airlineName.textContent = 'Airline Name: ' + mainData[i].airline.name
                flightNumber.textContent = 'Flight Number: ' + mainData[i].flight.number

                flightDivEl.append(originAirport)
                flightDivEl.append(destinationAirport)
                flightDivEl.append(airlineName)
                flightDivEl.append(flightNumber)

            }
            
        })
        .catch(function (error) {
            console.log(error)
        })

}