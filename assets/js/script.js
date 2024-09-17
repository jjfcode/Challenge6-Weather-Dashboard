const apiKey = "28a0f93f4dc602373276a1149e2354ea";
const searchFormEl = document.getElementById('search-form');
const cityNameEl = document.getElementById('city-name');
const currentWeatherEl = document.getElementById('current-weather');
const fiveDayEl = document.getElementById('five-day');
//TODO: create global array to save city from the input textbox.
// you have get from localstorage first if it exists otherwise default it to []
//example:  const cityArr=  JSON.parse(localStorage.getItem("cities")) || []

function searchCity(event) {
    event.preventDefault();
    const cityName = cityNameEl.value;
    populateCurrentWeather(cityName);
    populate5Day(cityName);
}

function populateCurrentWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //TODO: push  data.name (city name) into an array and save that array into localstorage using JSON.stringfy
            //reference week 4 - activity 26
            currentWeatherEl.innerHTML = `
            <h3>${data.name} (${dayjs.unix(data.dt).format('MM/DD/YYYY')})<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h3>
            <h5>Temp: <span>${data.main.temp} °F</span></h5>
            <h5>Wind: <span>${data.wind.speed} MPH</span></h5>
            <h5>Humidity: <span>${data.main.humidity} %</span></h5>`;
            console.log(data);
        });
}

function populate5Day(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            fiveDayEl.textContent = '';

            for (let i = 3; i < data.list.length; i = i + 8) {
                const forecast = data.list[i]
                console.log(forecast);
                fiveDayEl.innerHTML += `
                <div class="col-sm-2 mb-3 mb-sm-0">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${dayjs.unix(forecast.dt).format('MM/DD/YYYY')}</h5>
                            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="">
                            <h5>Temp: <span>${forecast.main.temp} °F</span></h5>
                            <h5>Wind: <span>${forecast.wind.speed} MPH</span></h5>
                            <h5>Humidity: <span>${forecast.main.humidity} %</span></h5>
                        </div>
                    </div>
                </div>`;
            }
        });
}

searchFormEl.addEventListener('submit', searchCity);

//TODO: get latest city from localstorage to replace default value ex chicago 
populateCurrentWeather('miami');
populate5Day('miami');