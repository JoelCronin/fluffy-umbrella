# Weather Forecast

In this task the client wnated me to produce a weather forecast application that could detail the weather for all the major cities across the world. They wanted it to not only have current weather conditions but also a five day forecast, to show the UVI rating(which changes colour depending on its severity) and the ability for the user to research a city without retyping out the city they searched for before.

## Approach

To get the weather data I had to make a fetch request from the Open Weather API. To do this I used the users input to alter the url request that was sent to Open Weather which then responded with a range of current weather data. Pakrt of this was also the cities co-ordinates which I could then use to do another call back to Open Weather 2.5 which provides the UVI figures as well as the five-day forecast.

I then used an if else statement which changed the colour of the UVI Index background depending on its severity and a for loop to iterate through the receiced data and produce the five different days forecasts. Lastly, I added a function in that produced new buttons every time a new city was searched and when pressed the city that was assigned to that button would display its weather forecast data on screen again.

## Final Product
 
 ![Fullsize webpage](./assets/images/Final%20Product.png)

 ## Link

To view the portfolio yourself please [click here](https://joelcronin.github.io/fluffy-umbrella/)
