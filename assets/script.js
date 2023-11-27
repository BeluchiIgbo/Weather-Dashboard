const cityInput = document.querySelector('#city-input');
const primaryCard = document.querySelector('.current-weather-card');
const searchButton = document.querySelector('.button-search');
const forecastCards = document.querySelector('.forecast-cards');
const sectionContent = document.querySelector('.content-card');

// clicks the search button and run api 
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;

//API key
const apiKey = 'b387e87097fd53a18c69aafda5384e3c'; 
const apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`; 
  localStorage.setItem("city", JSON.stringify(city)); // saving user searches to local storage
  showPastSearches();
  fetch(apiUrl)
    .then(response => 
      response.json())
    .then(data => {
      const forecastDays = []; 
      const fiveDaysForecast = data.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (!forecastDays.includes(forecastDate)) {
                return forecastDays.push(forecastDate);
            }
        });

        cityInput.value = "";
        primaryCard.innerHTML = "";
        forecastCards.innerHTML = "";


      
      fiveDaysForecast.forEach((forecast, index) => {
      const date = forecast.dt_txt.split(" ")[0];
      const icon = forecast.weather[0].icon;
      const iconUrl = 'https://openweathermap.org/img/wn/' + icon +'.png';
      const temperature = forecast.main.temp -273;
      const windSpeed = forecast.wind.speed;
      const humidity = forecast.main.humidity;
      
      if (index === 0) {
        const cardHeader = document.createElement('section');
        cardHeader.innerHTML = '<h1>' + city + ' ' + '(' + date + ')' + '<img src= "'+ iconUrl + '">' + '</h1>' +
                                  '<p>Temp: ' + temperature + ' °C</p>'
                                  + '<p>Wind: ' + windSpeed + ' MPH</p>'
                                  + '<p>Humidity: ' + humidity + ' %</p>';
        primaryCard.appendChild(cardHeader);
      } else {
        const card = document.createElement('section');
        card.innerHTML = '<h4>' + date + '</h4>'
                            + '<img src= "'+ iconUrl + '">'
                            + '<p>Temperature: ' + temperature + ' °C</p>'
                            + '<p>Wind: ' + windSpeed + ' MPH</p>'
                            + '<p>Humidity: ' + humidity + ' %</p>';
        forecastCards.appendChild(card);                      
      }        
      });  
    })
    .catch((error) => {
        console.log('issues getting data from API', error);
    });
}
)

function showPastSearches() {
  var citySearch = JSON.parse(localStorage.getItem("city"));
  
  if (citySearch !== null) {
    const searchList = document.querySelector("#search-history");
    const listItem = document.createElement('li');
    listItem.textcontent = citySearch;
    searchList.appendChild(listItem);
    listItem.addEventListener('click', function() {
      cityInput.value = listItem.textcontent;
    }) 
  };
}


window.addEventListener('load', function() {
  showPastSearches();
});


