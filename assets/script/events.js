var btnMainEl = document.getElementById('btn-flights')
var flightDivEl = document.getElementById('flight-div')

btnMainEl.addEventListener('click', showApiData);

function showApiData(event) {
    event.preventDefault()
    
    var destinationEl = document.getElementById('destination')
    var citySearch = destinationEl.value
    console.log(citySearch)
    
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?city=' + citySearch + '&apikey=jITHRBn97SIAoqceTdmAptHok8NWaIBv'

    fetch(requestUrl)
        .then(function (response) {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json();
        })
        .then(function (data) {
            if (typeof data._embedded === 'undefined') {
                console.log('this was undefined');
                var eventAlert = document.createElement('p2');
                eventAlert.textContent = 'NO LOCAL EVENTS IN THE NEAR FUTURE';
                flightDivEl.append(eventAlert);
            }
            console.log(data._embedded.events);
            var mainData = data._embedded.events
            for (var i = 0; i < mainData.length; i++) {
                var eventName = document.createElement('h5');
                var startDate = document.createElement('p2');
                var eventStatus = document.createElement('p2');
                var eventLink = document.createElement('p3');
                var section1 = document.createElement('section');
                var section2 = document.createElement('section');

                eventName.textContent = mainData[i].name;
                startDate.textContent = 'Date: ' + mainData[i].dates.start.localDate;
                eventStatus.textContent = 'Status: ' + mainData[i].dates.status.code;
                eventLink.textContent = mainData[i].url;

                flightDivEl.append(section1);
                flightDivEl.append(section2);

                section1.append(eventName);
                section1.append(startDate);
                section1.append(eventStatus);
                section2.append(eventLink);

                section2.style.marginBottom = '50px';

            }
            
        })
        .catch(function (error) {
            console.log(error)
        })

}

