// Mock weather data for demo (replace API_KEY with a real OpenWeatherMap key for live data)
const mockData = {
  mumbai:    { temp: 32, feels: 36, humidity: 80, wind: '14 km/h', desc: 'Partly Cloudy',  icon: '⛅' },
  delhi:     { temp: 28, feels: 31, humidity: 55, wind: '10 km/h', desc: 'Haze',            icon: '🌫️' },
  london:    { temp: 12, feels: 9,  humidity: 78, wind: '20 km/h', desc: 'Overcast Clouds', icon: '☁️' },
  newyork:   { temp: 18, feels: 16, humidity: 60, wind: '16 km/h', desc: 'Clear Sky',       icon: '☀️' },
  tokyo:     { temp: 22, feels: 22, humidity: 65, wind: '8 km/h',  desc: 'Few Clouds',      icon: '🌤️' },
  paris:     { temp: 15, feels: 13, humidity: 72, wind: '18 km/h', desc: 'Light Rain',      icon: '🌧️' },
  sydney:    { temp: 25, feels: 24, humidity: 58, wind: '12 km/h', desc: 'Sunny',           icon: '☀️' },
  bangalore: { temp: 26, feels: 27, humidity: 68, wind: '9 km/h',  desc: 'Mostly Cloudy',  icon: '🌥️' },
};

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const errorMsg = document.getElementById('error-msg');
const recentList = document.getElementById('recent-list');

let recentSearches = JSON.parse(localStorage.getItem('recentCities')) || [];

function renderRecent() {
  recentList.innerHTML = '';
  recentSearches.slice(0, 5).forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.addEventListener('click', () => {
      cityInput.value = city;
      searchWeather(city);
    });
    recentList.appendChild(li);
  });
}

function searchWeather(city) {
  errorMsg.textContent = '';
  const key = city.toLowerCase().replace(/\s/g, '');
  const data = mockData[key];

  if (!data) {
    weatherCard.style.display = 'none';
    errorMsg.textContent = 'City not found. Try: Mumbai, Delhi, London, New York, Tokyo, Paris, Sydney, Bangalore.';
    return;
  }

  document.getElementById('city-name').textContent = city.charAt(0).toUpperCase() + city.slice(1);
  document.getElementById('weather-icon').textContent = data.icon;
  document.getElementById('temperature').textContent = `${data.temp}°C`;
  document.getElementById('description').textContent = data.desc;
  document.getElementById('humidity').textContent = `${data.humidity}%`;
  document.getElementById('wind').textContent = data.wind;
  document.getElementById('feels-like').textContent = `${data.feels}°C`;

  weatherCard.style.display = 'block';

  // Save to recent
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  recentSearches = [cityName, ...recentSearches.filter(c => c.toLowerCase() !== cityName.toLowerCase())];
  localStorage.setItem('recentCities', JSON.stringify(recentSearches));
  renderRecent();
}

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) searchWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) searchWeather(city);
  }
});

renderRecent();
