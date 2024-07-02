import './style.css'

const apiKey = "68752630d7b8413394e160934242806"
const currentUrl = "http://api.weatherapi.com/v1/current.json"
const forecastUrl = "http://api.weatherapi.com/v1/forecast.json"

const locationform = document.querySelector('form')
async function fetchWeather(form){
    form.preventDefault();
    alert(form.location)
}
locationform.addEventListener('submit',fetchWeather)