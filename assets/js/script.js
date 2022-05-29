var urlKey = "76488591069f094a172277faaa439f1e";
var city;
var searchButton = document.getElementById('searchButton')
var displayCity = document.getElementById('display-city')
var displayEmoji = document.getElementById('display-emoji')
var displayTemp = document.getElementById('display-temp')
var displayWind = document.getElementById('display-wind')
var displayUV = document.getElementById('display-UV')
var weatherIcon = document.getElementById('weather-icon')
var cityList = document.getElementById('city-list')



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
            const milliseconds = (data.dt * 1000)
            const dateObject = new Date(milliseconds);
            const dateFormat = dateObject.toLocaleString();
            displayCity.textContent = data.name + " " + dateFormat
            weatherIcon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            displayTemp.textContent = Math.round((data.main.temp - 273))
            displayWind.textContent = data.wind.speed;
            var cityButton =document.createElement('button')
            cityButton.textContent = data.name;
            cityList.append(cityButton);
            localStorage.setItem("data", JSON.stringify(data))
            renderData();
        }) 
    };
})

function renderData(){
var dataObject = JSON.parse(localStorage.getItem("data"))
console.log(dataObject);
getFiveDayForecast();

function getFiveDayForecast(){
    var secondRequestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + dataObject.coord.lat + "&lon=" + dataObject.coord.lon + "&units=metric&appid=76488591069f094a172277faaa439f1e"
    fetch(secondRequestUrl)
    .then(function(response2){
        return response2.json()
    })
    .then(function(data2){
        console.log(data2);
        displayUV.textContent = "UV Index" + data2.current.uvi;
        for (var i = 0; i < 2; i++){
            var date5 = document.createElement("h3");
            var img5 = document.createElement("img")
            var temp5 = document.createElement("p")
            var wind5 = document.createElement("p")
            var humidity5 = document.createElement("p")
            const milliseconds2 = (data2.daily[i].dt * 1000);
            const dateObject2 = new Date(milliseconds2);
            const dateFormat2 = dateObject2.toLocaleString();
            date5.textContent = dateFormat2;
            img5.src = "http://openweathermap.org/img/wn/" + data2.daily[i].weather[0].icon + "@2x.png"
            temp5.textContent = "Temp: " + data2.daily[i].temp.day + "c";
            wind5.textContent = "Wind: " + data2.daily[i].wind_speed + " m/s";
            humidity5.textContent = "Humidity: " + data2.daily[i].humidity + "%"
            cityList.append(date5);
            cityList.append(img5);
            cityList.append(temp5);
            cityList.append(wind5);
            cityList.append(humidity5);
        }
    })
    
}
}

// console.log(city)





