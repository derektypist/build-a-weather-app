const getForecast = document.getElementById("get-forecast");
const locationLabel = document.querySelector('.location-label');
const mainWeatherText = document.querySelector('.main-weather-text');
const imgWeatherIcon = document.querySelector('.img-weather-icon');
const weatherMainText = document.querySelector('.weather-main-text');
const mainHumidityText = document.querySelector('.main-humidity-text');
const mainFeelsLikeText = document.querySelector('.main-feels-like-text');
const windText = document.querySelector('.wind-text');
const windGustText = document.querySelector('.wind-gust-text');


const getWeather = async function (city) {
  try {
    const res = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
  const data = await res.json();
  if (!res.ok) alert('Something went wrong, please try again later');
  return data;
  } catch (err) {
    console.log(err);
  }
  
};

const showWeather = async function (city) {
  try {
    const data = await getWeather(city);
    if (!data) throw new Error();
    const weatherInfoContainer = document.querySelector(".weather-info-container");
    const location = !data.name ? 'N/A' : data.name;
    const temperature = !data.main.temp ? 'N/A' : `${data.main.temp} °C`;
    const weatherIcon = !data.weather[0].icon ? 'N/A' : data.weather[0].icon;
    const weatherDescription = !data.weather[0].description ? 'N/A' : data.weather[0].description;
    const mainText = !data.weather[0].main ? 'N/A' : data.weather[0].main;
    const humidity = !data.main.humidity ? 'N/A' : `Humidity: ${data.main.humidity} %`;
    const feelsLike = !data.main.feels_like ? 'N/A' : `Feels Like: ${data.main.feels_like} °C`;
    const windSpeed = !data.wind.speed ? 'N/A' : `Wind: ${data.wind.speed} m/s`;
    const windGust = !data.wind.gust ? 'N/A' : `Gusts: ${data.wind.gust} m/s`;
    locationLabel.textContent = location;
    mainWeatherText.textContent = temperature;
    imgWeatherIcon.setAttribute('src',weatherIcon);
    imgWeatherIcon.setAttribute('alt',weatherDescription);
    weatherMainText.textContent = mainText;
    mainHumidityText.textContent = humidity;
    mainFeelsLikeText.textContent = feelsLike;
    windText.textContent = windSpeed;
    windGustText.textContent = windGust;

    weatherInfoContainer.classList.remove('hidden');

  } catch (err) {
    const element = document.querySelector('.weather-info-container');
    element.innerHTML = `<span class="msg">Something went wrong, please try again later</span>`;
    element.classList.remove('hidden');
    console.log(err);
  }
  
}

getForecast.addEventListener('click', function () {
  const selection = document.getElementById('location-selector');
  if (selection.value === '') return;
  showWeather(selection.value);
  selection.value = '';
});
