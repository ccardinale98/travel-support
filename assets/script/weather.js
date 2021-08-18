console.log("This is weather JS");

var weatherText = document.getElementById('weather-div');
var mainBtn = document.getElementById('btn-main');

// --------- function below displays current weather - earlier code -------------------------------

// function getWeather(event) {
//     event.preventDefault();

//     var destinationEl = document.getElementById('destination');
//     var citySearch = destinationEl.value;
//     console.log(citySearch);

//     var weatherUrl = "https://api.openweathermap.org/data/2.5/find?q="+citySearch+"&units=imperial&appid=8700e57210e221e9d8ed86f8673042c4";

//     fetch(weatherUrl)
//         .then(function (response) {
//             console.log(response);
//             console.log(response.status);
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             var tempData = document.createElement("p");
//             var humData = document.createElement("p");
//             var descriptionData = document.createElement("p");
//             var temp = data.list[0].main.temp;
//             var humidity = data.list[0].main.humidity;
//             var description = data.list[0].weather[0].description;

//             tempData.textContent = ("Current temperature in "+citySearch+" : " + temp + "degree F");
//             humData.textContent = ("Current humidity in "+citySearch+" : " + humidity + "%");
//             descriptionData.textContent = ("Current weather condition: " + description);
//             weatherText.append(tempData);
//             weatherText.append(humData);
//             weatherText.appendChild(descriptionData);
//         });
// }

// ----------------------------------------------------------------------------------------------------------


function getWeather(event) {
    event.preventDefault();

    var destinationEl = document.getElementById('destination');
    var citySearch = destinationEl.value;
    console.log(citySearch);

    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+citySearch+"&appid=8700e57210e221e9d8ed86f8673042c4";
    fetch(weatherUrl)
        .then(function (response) {
            console.log(response);
            console.log(response.status);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var tempData = document.createElement("p");
            var temp = data.list[0].main.temp;
            var tempInF = ((((temp - 273.15) *9)/5) + 32).toFixed(2);
            var timeStampUnix = new Date((data.list[0].dt)*1000);
            var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            var monthInEng = months[timeStampUnix.getMonth()];
            var dateNum = timeStampUnix.getDate();
            var description = data.list[0].weather[0].description;

            tempData.textContent = ("The temperature in "+citySearch+" on " +monthInEng+" "+dateNum+" is " +tempInF+ " degree F and the weather condition is " + description);
            weatherText.append(tempData);
        });
}


mainBtn.addEventListener("click", getWeather);