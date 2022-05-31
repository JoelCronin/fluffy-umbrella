var urlKey = "76488591069f094a172277faaa439f1e";
var city;
var city2;
var searchButton = document.getElementById('searchButton')
var displayCity = document.getElementById('display-city')
var displayEmoji = document.getElementById('display-emoji')
var displayTemp = document.getElementById('display-temp')
var displayWind = document.getElementById('display-wind')
var displayUV = document.getElementById('display-UV')
var weatherIcon = document.getElementById('weather-icon')
var cityList = document.getElementById('city-list')
var fivedayBox = document.getElementById("five-day-box")
var secondSearch = document.getElementsByClassName("secondSearch")
var weatherIcon = document.getElementById("weather-icon")


//User Input into search box is used to get weather data from Open Weather when search button is pressed
searchButton.addEventListener('click', function(event){
    event.preventDefault();
    var city = document.getElementById("citySearch").value
    getCityAPi();


    function getCityAPi(){
        var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=76488591069f094a172277faaa439f1e";
    
        fetch(requestUrl)
            .then(function(response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // This part populates all the current forecast HTML areas
            weatherIcon.style.display = "block";
            var dateString = moment.unix(data.dt).format("MM/DD/YYYY")
            displayCity.textContent = data.name + " " + dateString
            weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            displayTemp.textContent = "Temperature: " + Math.round((data.main.temp - 273)) + "c"
            displayWind.textContent = "Wind: " + data.wind.speed + "m/s";
            var cityButton = document.createElement('button')
            cityButton.textContent = data.name;
            cityButton.setAttribute("id", data.name)
            cityButton.setAttribute("class", "secondSearch")
            cityButton.addEventListener("click", nextSearch)
            cityList.append(cityButton);
            localStorage.setItem("data", JSON.stringify(data));
            renderFutureData();
        }) 
    };
})

// Second call made to Open weather to get UVI and 5 day forecast data
function renderFutureData(){
var dataObject = JSON.parse(localStorage.getItem("data"))
console.log(dataObject);
getFiveDayForecast();

function getFiveDayForecast(){
    var secondRequestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + dataObject.coord.lat + "&lon=" + dataObject.coord.lon + "&units=metric&appid=76488591069f094a172277faaa439f1e"
    fetch(secondRequestUrl)
    .then(function(response2){
        return response2.json()
    })
    // Depending on UVI number background changes to red, green or yellow 
    .then(function(data2){
        console.log(data2);
        displayUV.textContent = "UV Index: " + data2.current.uvi;
        displayUV.classList.remove("severe", "low", "moderate")
        if (data2.current.uvi > 6 ){
           displayUV.classList.add("severe"); 
        } else if (data2.current.uvi < 2 ) {
            displayUV.classList.add("low");
        } else {
            displayUV.classList.add("moderate"); 
        }
// For loop used to populate all the five day forecast HTML elements
        for (var i = 0; i < 5; i++){
            var dateString2 = moment.unix(data2.daily[i].dt).format("MM/DD/YYYY")
            document.getElementById(`date${i}`).textContent = dateString2;
            document.getElementById(`img${i}`).src = "https://openweathermap.org/img/wn/" + data2.daily[i].weather[0].icon + "@2x.png"
            document.getElementById(`temp${i}`).textContent = "Temp: " + data2.daily[i].temp.day + "c";
            document.getElementById(`wind${i}`).textContent = "Wind: " + data2.daily[i].wind_speed + " m/s";
            document.getElementById(`humidity${i}`).textContent = "Humidity: " + data2.daily[i].humidity + "%"
        }
    })
}
}

//Is called when the users prior city choice buttons are pressed and then brings back that data in same way as when they pushed search button except uses button id rather than user text input
function nextSearch(event){
    event.preventDefault();
    console.log("correct")
 var city2 = event.target.id;
 console.log(city2)
 getCityAPi2();

 function getCityAPi2(){
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city2 + "&appid=76488591069f094a172277faaa439f1e";

    fetch(requestUrl)
        .then(function(response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var dateString3 = moment.unix(data.dt).format("MM/DD/YYYY")
        displayCity.textContent = data.name + " " + dateString3
        weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        displayTemp.textContent = "Temperature: " + Math.round((data.main.temp - 273)) + "c"
        displayWind.textContent = "Wind: " + data.wind.speed + "m/s";
        localStorage.setItem("data", JSON.stringify(data));
        renderFutureData2();
    }) 
    };
 }

// Renders the five day forecast data when user presses on their prior city searches button
 function renderFutureData2(){
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
            displayUV.textContent = "UV Index: " + data2.current.uvi;
            displayUV.classList.remove("severe", "low", "moderate")
            if (data2.current.uvi > 6 ){
               displayUV.classList.add("severe"); 
            } else if (data2.current.uvi < 2 ) {
                displayUV.classList.add("low");
            } else {
                displayUV.classList.add("moderate"); 
            }
    
            for (var i = 0; i < 5; i++){
                var dateString2 = moment.unix(data2.daily[i].dt).format("MM/DD/YYYY")
                document.getElementById(`date${i}`).textContent = dateString2;
                document.getElementById(`img${i}`).src = "https://openweathermap.org/img/wn/" + data2.daily[i].weather[0].icon + "@2x.png"
                document.getElementById(`temp${i}`).textContent = "Temp: " + data2.daily[i].temp.day + "c";
                document.getElementById(`wind${i}`).textContent = "Wind: " + data2.daily[i].wind_speed + " m/s";
                document.getElementById(`humidity${i}`).textContent = "Humidity: " + data2.daily[i].humidity + "%"
            }
        })
    }
    }
    
