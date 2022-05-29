var urlKey = "76488591069f094a172277faaa439f1e";
var city;
var searchButton = document.getElementById('searchButton')
var displayCity = document.getElementById('display-city')
var displayEmoji = document.getElementById('display-emoji')
var displayTemp = document.getElementById('display-temp')
var displayWind = document.getElementById('display-wind')
var displayUV = document.getElementById('display-UV')
var weatherIcon = document.getElementById('weather-icon')

searchButton.addEventListener('click', function(event){
    event.preventDefault();
    var city = document.getElementById("citySearch").value

    if(city === ""){
        console.log("blank")
    } else{
        console.log(city)
        getCityAPi();
    }
    function getCityAPi(){
        var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=76488591069f094a172277faaa439f1e";
    
        fetch(requestUrl)
            .then(function(response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayCity.textContent = data.name
            weatherIcon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            displayTemp.textContent = Math.round((data.main.temp - 273))
            displayWind.textContent = data.wind.speed
        })
    }

    function getFiveDayForecast(){
        var secondRequestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=76488591069f094a172277faaa439f1e"
    }
})




console.log(city)



