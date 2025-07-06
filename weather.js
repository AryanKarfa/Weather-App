const apiKey = 'c83ba47753ea334462a6cd543a989c11';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDiv = document.querySelector('.weather');
const errorDiv = document.querySelector('.error');
const weatherIcon = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                weatherDiv.style.display = 'none';
                errorDiv.style.display = 'block';
            } else {
                errorDiv.style.display = 'none';
                updateWeather(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch weather data.');
        });
});

function updateWeather(data) {
    cityElement.textContent = data.name;
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} km/h`;

    const weatherMain = data.weather[0].main.toLowerCase();

    if (weatherMain.includes("cloud")) {
        weatherIcon.src = "Images/clouds.png";
    } else if (weatherMain.includes("rain")) {
        weatherIcon.src = "Images/rain.png";
    } else if (weatherMain.includes("clear")) {
        weatherIcon.src = "Images/clear.png";
    } else if (weatherMain.includes("snow")) {
        weatherIcon.src = "Images/snow.png";
    } else if (weatherMain.includes("mist")) {
        weatherIcon.src = "Images/mist.png";
    } else {
        weatherIcon.src = "Images/weather.png";
    }

    weatherDiv.style.display = 'block';
}
