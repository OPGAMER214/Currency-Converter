const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

// Load currency list
fetch(apiURL)
.then(res => res.json())
.then(data => {
    const currencies = Object.keys(data.rates);

    currencies.forEach(curr => {
        fromCurrency.innerHTML += `<option value="${curr}">${curr}</option>`;
        toCurrency.innerHTML += `<option value="${curr}">${curr}</option>`;
    });

    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
});

// Convert function
function convertCurrency() {
    if(amount.value === "" || amount.value <= 0){
        result.innerHTML = "Enter a valid amount.";
        return;
    }

    fetch(apiURL)
    .then(res => res.json())
    .then(data => {
        let fromRate = data.rates[fromCurrency.value];
        let toRate = data.rates[toCurrency.value];

        let convertedAmount = (amount.value / fromRate) * toRate;

        result.innerHTML = `${amount.value} ${fromCurrency.value} = ${convertedAmount.toFixed(2)} ${toCurrency.value}`;
    });
}
