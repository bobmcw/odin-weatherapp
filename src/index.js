import "./style.css";

const apiKey = "68752630d7b8413394e160934242806";
const currentUrl = "http://api.weatherapi.com/v1/current.json";
const forecastUrl = "http://api.weatherapi.com/v1/forecast.json";

const locationform = document.querySelector("form");
const forminput = document.querySelector("#location");
async function fetchCurrentWeather(form) {
  form.preventDefault();
  await fetch(`${currentUrl}?key=${apiKey}&q=${forminput.value}`, {
    mode: "cors",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      drawCurrentWeather(data);
    });
}
function drawCurrentWeather(data) {
  const unit = document.querySelector('input[name=unit]')
  const container = document.querySelector(".container");
  console.log(data);
  const currentBody = document.createElement("div");
  currentBody.classList.add("current");
  const country = document.createElement("h3");
  console.log(data);
  country.innerText = data.location.country;
  const city = document.createElement("h1");
  city.innerText = data.location.name;
  currentBody.appendChild(city);
  currentBody.appendChild(country);
  container.appendChild(currentBody);
  const weatherBody = document.createElement("div");
  weatherBody.classList.add("currentWeather");
  const condition = document.createElement("h3");
  condition.innerText = data.current.condition.text;
  const temperature = document.createElement("h3");
  temperature.innerText = unit.checked ? `${data.current.temp_c} C` : `${data.current.temp_f} F`;
  weatherBody.appendChild(condition);
  weatherBody.appendChild(temperature);
  container.appendChild(weatherBody);
}
locationform.addEventListener("submit", fetchCurrentWeather);
