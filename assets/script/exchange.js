var select = document.querySelectorAll("select");
var input = document.querySelectorAll(".exchange-input");


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
 //   console.log(html);
  for (let i = 0; i < select.length; i++) {
    select[i].innerHTML = html;
  }

  
  function convert(i, a) {
    input[i].value =
    (input[a].value * rates[select[i].value]) / rates[select[a].value];
    // var num = input[i].value
    // var n = num.toFixed(2);
    // document.getElementById("input").innerHTML = n;
  }
//   console.log(rates[select[1].value]); //rates
  input[0].addEventListener("keyup", () => convert(1, 0));
//     input[1].value = input[0].value * rates[select[1].value] / rates[select[0].value];
  //   );
  input[1].addEventListener("keyup", () => convert(0, 1));
//     input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value];
  //   });
  select[0].addEventListener("change", () => convert(1, 0));
//     input[1].value = input[0].value * rates[select[1].value] / rates[select[0].value];
  //   });
  select[1].addEventListener("change", () => convert(0, 1));
  //     input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value];
  //   });
}
getCurrency();


// tried - Instead of step="any", which allows for any number of decimal places, use step=".01", which allows up to two decimal places in html .
// tried - Using JavaScript validation
// tried - javascript limit input to 2 decimal places
// Might have something to do with the api that i used .. (I'm not entirely sure..)