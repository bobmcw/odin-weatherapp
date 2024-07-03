import "./style.css";

const apiKey = "68752630d7b8413394e160934242806";
const currentUrl = "http://api.weatherapi.com/v1/current.json";
const forecastUrl = "http://api.weatherapi.com/v1/forecast.json";

const locationform = document.querySelector("form");
const forminput = document.querySelector("#location");
async function fetchCurrentWeather(form) {
  form.preventDefault();
  await fetch(`${currentUrl}?key=${apiKey}&q=${forminput.value}`).then(
    (response) => {console.log(response.json())}
  );
}
locationform.addEventListener("submit", fetchCurrentWeather);


