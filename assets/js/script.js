const apiKey = "28a0f93f4dc602373276a1149e2354ea";
const searchFormEl = document.getElementById('search-form');
const cityNameEl = document.getElementById('city-name');

function searchCity(event){
    event.preventDefault();
    const cityName=cityNameEl.value;
    populateCurrentWeather(cityName)
}

function populateCurrentWeather(cityName){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
}

searchFormEl.addEventListener('submit', searchCity);
