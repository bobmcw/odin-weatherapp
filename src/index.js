import "./style.css";

const apiKey = "68752630d7b8413394e160934242806";
const giphyKey = "HKFr61JQJ6oZ78TfJqmWSxhiX14BKZRT"
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
  container.innerHTML = "";
  console.log(data);
  const location = document.createElement("div");
  location.classList.add("current");
  const country = document.createElement("h3");
  console.log(data);
  country.innerText = data.location.country;
  const city = document.createElement("h1");
  city.innerText = data.location.name;
  location.appendChild(city)
  location.appendChild(country)
  const weatherBody = document.createElement("div");
  weatherBody.classList.add("currentWeather");
  const condition = document.createElement("h3");
  condition.innerText = data.current.condition.text;
  const temperature = document.createElement("h3");
  temperature.innerText = unit.checked ? `${data.current.temp_c} C` : `${data.current.temp_f} F`;
  const locationBG = document.createElement('div')
  location.appendChild(condition);
  location.appendChild(temperature);
  locationBG.style.backgroundColor = 'rgba(0,0,0,0.5)'
  locationBG.style.width = '30%'
  locationBG.style.height = '100%'
  location.style.color = 'white';
  locationBG.appendChild(location)
  weatherBody.appendChild(locationBG);
  container.appendChild(weatherBody);
    const query = data.current.condition.text.replace(/\s/g, '-')
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=outside-${query}-weather&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`, {mode: 'cors'})
    .then((response)=>{return response.json()})
    .then((data)=>{return data.data[0].images.original.webp})
    .then((url)=>{
        weatherBody.style.backgroundImage = `url('${url}')`;
    })
}
locationform.addEventListener("submit", fetchCurrentWeather);
