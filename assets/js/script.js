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
            displayTemp.textContent = "Temperature: " + Math.round((data.main.temp - 273)) + "c"
            displayWind.textContent = "Wind: " + data.wind.speed + "m/s";
            var cityButton = document.createElement('button')
            cityButton.textContent = data.name;
            cityButton.setAttribute("id", data.name)
            cityButton.setAttribute("class", "secondSearch")
            cityButton.addEventListener("click", nextSearch)
            cityList.append(cityButton);
            localStorage.setItem("data", JSON.stringify(data));
            renderData();
//Removes all old 5-day forecast elements to make way for new ones
            var dateId0 = document.getElementById("dateId0");
            dateId0.remove();
            var dateId1 = document.getElementById("dateId1");
            dateId1.remove();
            var dateId2 = document.getElementById("dateId2");
            dateId2.remove();
            var dateId3 = document.getElementById("dateId3");
            dateId3.remove();
            var dateId4 = document.getElementById("dateId4");
            dateId4.remove(); 

            var imgId0 = document.getElementById("imgId0");
            imgId0.remove();
            var imgId1 = document.getElementById("imgId1");
            imgId1.remove();
            var imgId2 = document.getElementById("imgId2");
            imgId2.remove();
            var imgId3 = document.getElementById("imgId3");
            imgId3.remove();
            var imgId4 = document.getElementById("imgId4");
            imgId4.remove();

            var tempId0 = document.getElementById("tempId0");
            tempId0.remove();
            var tempId1 = document.getElementById("tempId1");
            tempId1.remove();
            var tempId2 = document.getElementById("tempId2");
            tempId2.remove();
            var tempId3 = document.getElementById("tempId3");
            tempId3.remove();
            var tempId4 = document.getElementById("tempId4");
            tempId4.remove();

            var windId0 = document.getElementById("windId0");
            windId0.remove();
            var windId1 = document.getElementById("windId1");
            windId1.remove();
            var windId2 = document.getElementById("windId2");
            windId2.remove();
            var windId3 = document.getElementById("windId3");
            windId3.remove();
            var windId4 = document.getElementById("windId4");
            windId4.remove();

            var humidityId0 = document.getElementById("humidityId0");
            humidityId0.remove();
            var humidityId1 = document.getElementById("humidityId1");
            humidityId1.remove();
            var humidityId2 = document.getElementById("humidityId2");
            humidityId2.remove();
            var humidityId3 = document.getElementById("humidityId3");
            humidityId3.remove();
            var humidityId4 = document.getElementById("humidityId4");
            humidityId4.remove();
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

            var date5 = document.createElement("h3");
            var img5 = document.createElement("img")
            var temp5 = document.createElement("p")
            var wind5 = document.createElement("p")
            var humidity5 = document.createElement("p")
            date5.setAttribute("id", "dateId" + [i])
            img5.setAttribute("id", "imgId" + [i])
            temp5.setAttribute("id", "tempId" + [i])
            wind5.setAttribute("id", "windId" + [i])
            humidity5.setAttribute("id", "humidityId" + [i])
            const milliseconds2 = (data2.daily[i].dt * 1000);
            const dateObject2 = new Date(milliseconds2);
            const dateFormat2 = dateObject2.toLocaleString();
            date5.textContent = dateFormat2;
            img5.src = "http://openweathermap.org/img/wn/" + data2.daily[i].weather[0].icon + "@2x.png"
            temp5.textContent = "Temp: " + data2.daily[i].temp.day + "c";
            wind5.textContent = "Wind: " + data2.daily[i].wind_speed + " m/s";
            humidity5.textContent = "Humidity: " + data2.daily[i].humidity + "%"
            fivedayBox.append(date5);
            fivedayBox.append(img5);
            fivedayBox.append(temp5);
            fivedayBox.append(wind5);
            fivedayBox.append(humidity5);
        }
    })
    
}
}


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
        const milliseconds = (data.dt * 1000)
        const dateObject = new Date(milliseconds);
        const dateFormat = dateObject.toLocaleString();
        displayCity.textContent = data.name + " " + dateFormat
        weatherIcon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        displayTemp.textContent = "Temperature: " + Math.round((data.main.temp - 273)) + "c"
        displayWind.textContent = "Wind: " + data.wind.speed + "m/s";
        localStorage.setItem("data", JSON.stringify(data));
        renderData2();
//Removes all old 5-day forecast elements to make way for new ones
        var dateId0 = document.getElementById("dateId0");
        dateId0.remove();
        var dateId1 = document.getElementById("dateId1");
        dateId1.remove();
        var dateId2 = document.getElementById("dateId2");
        dateId2.remove();
        var dateId3 = document.getElementById("dateId3");
        dateId3.remove();
        var dateId4 = document.getElementById("dateId4");
        dateId4.remove(); 

        var imgId0 = document.getElementById("imgId0");
        imgId0.remove();
        var imgId1 = document.getElementById("imgId1");
        imgId1.remove();
        var imgId2 = document.getElementById("imgId2");
        imgId2.remove();
        var imgId3 = document.getElementById("imgId3");
        imgId3.remove();
        var imgId4 = document.getElementById("imgId4");
        imgId4.remove();

        var tempId0 = document.getElementById("tempId0");
        tempId0.remove();
        var tempId1 = document.getElementById("tempId1");
        tempId1.remove();
        var tempId2 = document.getElementById("tempId2");
        tempId2.remove();
        var tempId3 = document.getElementById("tempId3");
        tempId3.remove();
        var tempId4 = document.getElementById("tempId4");
        tempId4.remove();

        var windId0 = document.getElementById("windId0");
        windId0.remove();
        var windId1 = document.getElementById("windId1");
        windId1.remove();
        var windId2 = document.getElementById("windId2");
        windId2.remove();
        var windId3 = document.getElementById("windId3");
        windId3.remove();
        var windId4 = document.getElementById("windId4");
        windId4.remove();

        var humidityId0 = document.getElementById("humidityId0");
        humidityId0.remove();
        var humidityId1 = document.getElementById("humidityId1");
        humidityId1.remove();
        var humidityId2 = document.getElementById("humidityId2");
        humidityId2.remove();
        var humidityId3 = document.getElementById("humidityId3");
        humidityId3.remove();
        var humidityId4 = document.getElementById("humidityId4");
        humidityId4.remove();
    }) 
};
 }

 function renderData2(){
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
                var date5 = document.createElement("h3");
                var img5 = document.createElement("img")
                var temp5 = document.createElement("p")
                var wind5 = document.createElement("p")
                var humidity5 = document.createElement("p")
                date5.setAttribute("id", "dateId" + [i])
                img5.setAttribute("id", "imgId" + [i])
                temp5.setAttribute("id", "tempId" + [i])
                wind5.setAttribute("id", "windId" + [i])
                humidity5.setAttribute("id", "humidityId" + [i])
                const milliseconds2 = (data2.daily[i].dt * 1000);
                const dateObject2 = new Date(milliseconds2);
                const dateFormat2 = dateObject2.toLocaleString();
                date5.textContent = dateFormat2;
                img5.src = "http://openweathermap.org/img/wn/" + data2.daily[i].weather[0].icon + "@2x.png"
                temp5.textContent = "Temp: " + data2.daily[i].temp.day + "c";
                wind5.textContent = "Wind: " + data2.daily[i].wind_speed + " m/s";
                humidity5.textContent = "Humidity: " + data2.daily[i].humidity + "%"
                fivedayBox.append(date5);
                fivedayBox.append(img5);
                fivedayBox.append(temp5);
                fivedayBox.append(wind5);
                fivedayBox.append(humidity5);
            }
        })
        
    }
    }
    
