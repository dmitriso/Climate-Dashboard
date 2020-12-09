// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

var key = "84eba78b970b65a9aa20f76723c97703";
var degree = "\u02DA";




$(document).ready(function () {
    // retrieve local storage (searched cities)
    // function that pulls weather data from Open Weather Api
    $("#searchCity").on("click", function (event) {
        event.preventDefault();

        // local variables for method use
        var cityName = $("#newCity").val();
        // var lat;
        // var lon;
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;

        // This method pulls the lat and lon of new city to be used 
        $.ajax({
            url: queryURL,
            method: "Get"
        }).then(function (res) {
            console.log(res);
            console.log(res.coord.lat);
            lat = res.coord.lat;
            console.log(res.coord.lon);
            lon = res.coord.lon;

            var lat;
            var lon;
            var gpsURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=" + "&appid=" + key;
            // This uses the lat and lon pulled from the above method to call desired weather data
            $.ajax({
                url: gpsURL,
                method: "Get"
            }).then(function (response) {
                console.log(response);
                // console.log(gpsURL);
                var fahrenheit = Math.round(((parseFloat(res.main.temp) - 273.15) * 1.80 + 32));
                var celcius = Math.round(parseFloat(res.main.temp) - 273.15);
                // console.log(fahrenheit);
                // Displays data onto designated elements
                $("#currentCity").text(res.name);
                $("#description").text("Clouds: " + res.weather[0].description);
                $("#humidity").text("Humidity: " + res.main.humidity);
                $("#windSpeed").text("Wind Speed: " + res.wind.speed);
                $("#fahrenheit").text("Temp: " + fahrenheit + degree + "F");
                $("#celcius").text("Temp: " + celcius + degree + "C");
                // Displaying data from second object
                $("#uv").text("UV Index: "+ response.current.uvi);


                $("#day1").text(Math.round(((response.daily[0].temp.day)- 273.15) * 1.80 + 32));
                $("#day2").text(Math.round(((response.daily[1].temp.day)- 273.15) * 1.80 + 32));
                $("#day3").text(Math.round(((response.daily[2].temp.day)- 273.15) * 1.80 + 32));
                $("#day4").text(Math.round(((response.daily[3].temp.day)- 273.15) * 1.80 + 32));
                $("#day5").text(Math.round(((response.daily[4].temp.day)- 273.15) * 1.80 + 32));

            })
        })




    });
});


