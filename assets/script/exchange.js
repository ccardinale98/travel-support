var select = document.querySelectorAll("select");
var input = document.querySelectorAll("input");
var requestUrl =
  "http://api.exchangeratesapi.io/v1/latest?access_key=af421db273008dfe472d3260a6a0b4e2";

async function getCurrency() {
  var res = await fetch(requestUrl);
  var data = await res.json();

  var arrKeys = Object.keys(data.rates);
  var rates = data.rates;
  let html = "";

  console.log(rates);
  arrKeys.map((item) => {
    return (html += `<option value=${item}>${item}</option>`);
  });

  for (let i = 0; i < select.length; i++) {
    select[i].innerHTML = html;
  }

  function convert(i, j) {
    input[i].value =
      (input[j].value * rates[select[i].value]) / rates[select[j].value];
  }

  input[0].addEventListener("keyup", () => convert(1, 0));

  input[1].addEventListener("keyup", () => convert(0, 1));

  select[0].addEventListener("change", () => convert(1, 0));

  select[1].addEventListener("change", () => convert(0, 1));
}
getCurrency();
