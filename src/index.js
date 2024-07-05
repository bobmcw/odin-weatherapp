import "./style.css";

const apiKey = "68752630d7b8413394e160934242806";
const giphyKey = "HKFr61JQJ6oZ78TfJqmWSxhiX14BKZRT"
const currentUrl = "http://api.weatherapi.com/v1/current.json";
const forecastUrl = "http://api.weatherapi.com/v1/forecast.json";

const locationform = document.querySelector("form");
const forminput = document.querySelector("#location");
let userPrefersCelcius = false;
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
    await fetch(`${forecastUrl}?key=${apiKey}&q=${forminput.value}&days=3`, {mode: 'cors'}).then((response)=>{
        return response.json()
    }).then((data)=>{
        drawForecast(data)
    })
}
function drawCurrentWeather(data) {
  const unit = document.querySelector('input[name=unit]')
  userPrefersCelcius = unit.checked
  const container = document.querySelector(".container");
  container.innerHTML = "";
  const location = document.createElement("div");
  location.classList.add("current");
  const country = document.createElement("h3");
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
  temperature.innerText = userPrefersCelcius ? `${data.current.temp_c} C` : `${data.current.temp_f} F`;
  location.appendChild(condition);
  location.appendChild(temperature);
  weatherBody.appendChild(location);
  container.appendChild(weatherBody);
    const query = data.current.condition.text.replace(/\s/g, '-')
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=outside-${query}-weather&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`, {mode: 'cors'})
    .then((response)=>{return response.json()})
    .then((data)=>{return data.data[0].images.original.webp})
    .then((url)=>{
        weatherBody.style.backgroundImage = `url('${url}')`;
    })
}
class forecastday{
    constructor(date,mintemp,maxtemp,avgtemp){
        this.date = date;
        this.mintemp = mintemp;
        this.maxtemp = maxtemp;
        this.avgtemp = avgtemp
    }
    get printdata(){
        console.log(this.maxtemp)
    }
    get showValues(){
        const container = document.querySelector(".forecast")
        const unitSymbol = userPrefersCelcius ? 'C' : 'F'
        console.log(container)
        const forecastItem = document.createElement('div')
        forecastItem.classList.add("forecastItem")
        const date = document.createElement("h2")
        date.innerText = this.date
        const temps = document.createElement('h3')
        temps.innerText = `${this.mintemp} ${unitSymbol} - ${this.maxtemp} ${unitSymbol}`
        const average = document.createElement('h3')
        average.innerText = `avg. ${this.avgtemp} ${unitSymbol}`
        forecastItem.appendChild(date)
        forecastItem.appendChild(temps)
        forecastItem.appendChild(average)
        container.appendChild(forecastItem)
    }
}
function drawForecast(data){
    const container = document.querySelector('.container')
    console.log(data) 
  const preferedUnit = userPrefersCelcius ? `temp_c` : `temp_f`;
  const days = []
  data.forecast.forecastday.forEach(day => {
   days.push(new forecastday(day.date,day.day[`min${preferedUnit}`],day.day[`max${preferedUnit}`],day.day[`avg${preferedUnit}`])) 
  });
  console.log(days)
  const forecasts = document.createElement('div')
  forecasts.classList.add('forecast')
  container.appendChild(forecasts)
  days.forEach(day => {
    day.showValues
  });
}
locationform.addEventListener("submit", fetchCurrentWeather);

