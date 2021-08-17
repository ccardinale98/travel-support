console.log("This is weather JS");

var weatherText = document.getElementById('weather-div');
var mainBtn = document.getElementById('btn-main');

function getWeather(event) {
    event.preventDefault();

    var destinationEl = document.getElementById('destination');
    var citySearch = destinationEl.value;
    console.log(citySearch);

    var weatherUrl = "https://api.openweathermap.org/data/2.5/find?q="+citySearch+"&units=imperial&appid=8700e57210e221e9d8ed86f8673042c4";

    fetch(weatherUrl)
        .then(function (response) {
            console.log(response);
            console.log(response.status);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var tempData = document.createElement("p");
            var humData = document.createElement("p");
            var descriptionData = document.createElement("p");
            var temp = data.list[0].main.temp;
            var humidity = data.list[0].main.humidity;
            var description = data.list[0].weather[0].description;

            tempData.textContent = ("Current temperature in "+citySearch+" : " + temp + "degree F");
            humData.textContent = ("Current humidity in "+citySearch+" : " + humidity + "%");
            descriptionData.textContent = ("Current weather condition: " + description);
            weatherText.append(tempData);
            weatherText.append(humData);
            weatherText.appendChild(descriptionData);
        });
}

console.log(weatherBtn);

mainBtn.addEventListener("click", getWeather);