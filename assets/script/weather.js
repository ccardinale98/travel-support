console.log("This is weather JS");

var weatherText = document.getElementById('weather-div');
var mainBtn = document.getElementById('btn-main');

function getWeather(event) {
    event.preventDefault();
    var weatherUrl = "https://api.openweathermap.org/data/2.5/find?q=London&units=imperial&appid=8700e57210e221e9d8ed86f8673042c4";

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
            var temp = data.list[0].main.temp;
            var humidity = data.list[0].main.humidity;

            tempData.textContent = ("Current temperature in London is =" + temp + "degree F");
            humData.textContent = ("Current humidity in London is =" + humidity + "%")
            weatherText.appendChild(tempData);
            weatherText.appendChild(humData);
        });
}

console.log(weatherBtn);

mainBtn.addEventListener("click", getWeather);