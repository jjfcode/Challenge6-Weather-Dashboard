const apiKey = "28a0f93f4dc602373276a1149e2354ea";
const searchFormEl = document.getElementById('search-form');
const cityNameEl = document.getElementById('city-name');
const currentWeatherEl = document.getElementById('current-weather');
const fiveDayEl = document.getElementById('five-day');
const cityArr = JSON.parse(localStorage.getItem("cities")) || [];
const cityListEl = document.getElementById('city-list');

function renderCityList() {  
    cityListEl.innerHTML = '';

    cityArr.forEach(city => {
        const cityItem = document.createElement('button');
        cityItem.textContent = city;
        cityItem.setAttribute('class', 'btn btn-secondary w-100 my-2')
        cityListEl.appendChild(cityItem);
    });
}

function searchCity(cityName) {
    populateCurrentWeather(cityName);
    populate5Day(cityName);
}

function populateCurrentWeather(cityName) {

    cityName = cityName.trim();

    if (!cityName) {
        alert('Please enter a valid city name.');
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!cityArr.includes(data.name)) {
                cityArr.push(data.name);
                localStorage.setItem("cities", JSON.stringify(cityArr));
                renderCityList();
            }
            currentWeatherEl.innerHTML = `
            <h3>${data.name} (${dayjs.unix(data.dt).format('MM/DD/YYYY')})<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h3>
            <h6 class="mb-4">Temp: <span>${data.main.temp} °F</span></h6>
            <h6 class="mb-4">Wind: <span>${data.wind.speed} MPH</span></h6>
            <h6 class="mb-4">Humidity: <span>${data.main.humidity} %</span></h6>`;
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
                            <h5 class="mb-4">Temp: <span>${forecast.main.temp} °F</span></h5>
                            <h5 class="mb-4">Wind: <span>${forecast.wind.speed} MPH</span></h5>
                            <h5 class="mb-4">Humidity: <span>${forecast.main.humidity} %</span></h5>
                        </div>
                    </div>
                </div>`;
            }
        });
}

searchFormEl.addEventListener('submit', function(event){
    event.preventDefault();
    const cityName = cityNameEl.value;
    searchCity(cityName);
    cityNameEl.value = '';
});

cityListEl.addEventListener('click', function(event){
    if (event.target.tagName === 'BUTTON') {
        const cityName = event.target.textContent;
        searchCity(cityName);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    renderCityList();
});

const lastCity = cityArr.length > 0 ? cityArr[cityArr.length - 1] : 'miami';
populateCurrentWeather('miami');
populate5Day('miami');