var requestUrl =
  "https://v6.exchangerate-api.com/v6/f476b9db153c54bad3c7b6e4/latest/USD";
var responseText = document.getElementById("response-text");
var fetchButton = document.getElementById("fetch-button");

function getApi(requestUrl) {
  fetch(requestUrl).then(function (response) {
    console.log(response);
    if (response.status === 200) {
      responseText.textContent = response.status;
    }
    return response.json();
  }); 
}

getApi(requestUrl);

// fetchButton.addEventListener("click", getApi);
