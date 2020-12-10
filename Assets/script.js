var key = "84eba78b970b65a9aa20f76723c97703";
var degree = "\u02DA";
var cityList = [];
var cityName = $("#newCity").val();


$(document).ready(function () {
    // localStorage.clear();
    // Retrieve local storage (searched cities)
    var storedCities = JSON.parse(localStorage.getItem("cityList"));
         cityList = storedCities;

    
   
        renderCities();

    // For loop that retrieves all searched cities
    function renderCities() {
        for (var i = 0; i < storedCities.length; i++) {
            // this creates a new button and appends it to the ul with a value of each previously searched city
            $("ul").prepend($("<button>").text(storedCities[i]));
            // this adds classes to the enw buttons
            $("button").addClass("input-group-item");
            $("button").addClass("city");
        }
        // This grabs users last city that was searched
        var oldCity = storedCities[storedCities.length -1];
        searchCity(oldCity);
    }
    // This attaches  and sets conditions for search button
    $(document).on("click", "#searchCity", function(event){
        event.preventDefault();
        var newCity = $(this).siblings("#newCity").val();
        console.log(newCity);
        // Conditions for city search
        if(newCity === "") {
            return;
        } else if (cityList.includes(newCity)) {
            alert("The city you are looking for is already saved in you history! Just click its name in the list!");
        } else {
            cityList.push(newCity);
            searchCity(newCity);
        }
    })

    // Create event that sets previouse city buttons to searched city if clicked
    $(document).on("click", ".city", function(){
        // event.preventDefault();
        var cityValue = $(this).text();
        searchCity(cityValue);
    })

    // This stores the searched cities to local storage
    function storeCities() {
        localStorage.setItem("cityList", JSON.stringify(cityList));
    }

    // function that pulls weather data from Open Weather Api
    function searchCity(city){
        // local variables for method use
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
        // This method pulls the lat and lon of new city to be used 
        $.ajax({
            url: queryURL,
            method: "Get"
        }).then(function (res) {
            console.log(res);
            var lat = res.coord.lat;
            var lon = res.coord.lon;
            var gpsURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=" + "&appid=" + key;
            // This uses the lat and lon pulled from the above method to call desired weather data
            $.ajax({
                url: gpsURL,
                method: "Get"
            }).then(function (response) {
                console.log(response);
                var iconCode = response.current.weather[0].icon;
                var iconURL = "https://openweathermap.org/img/wn/" + iconCode + ".png";
                var fahrenheit = Math.round(((parseFloat(res.main.temp) - 273.15) * 1.80 + 32));
                var celcius = Math.round(parseFloat(res.main.temp) - 273.15);
                // Displays data onto designated elements
                $("#currentCity").text(res.name + "|" + (moment().format(" MMM. Do YY")));
                $("#description").text("Clouds: " + res.weather[0].description);
                $("#humidity").text("Humidity: " + res.main.humidity + "%");
                $("#windSpeed").text("Wind Speed: " + res.wind.speed);
                $("#fahrenheit").text("Temp: " + fahrenheit + degree + "F");
                $("#celcius").text("Temp: " + celcius + degree + "C");
                // Displaying data from second object
                $("#uv").text("UV Index: " + response.current.uvi);
                $("#wicon").attr("src", iconURL);
                // This Displays 5 day forecast for the week
                // This displays upcoming dates
                $("#date1").text(moment().add(1, 'days').format("MMM Do YY"));
                $("#date2").text(moment().add(2, 'days').format("MMM Do YY"));
                $("#date3").text(moment().add(3, 'days').format("MMM Do YY"));
                $("#date4").text(moment().add(4, 'days').format("MMM Do YY"));
                $("#date5").text(moment().add(5, 'days').format("MMM Do YY"));
                // Forecast for temp
                $("#temp1").text("Temperature: " + Math.round(((response.daily[0].temp.day) - 273.15) * 1.80 + 32) + degree);
                $("#temp2").text("Temperature: " + Math.round(((response.daily[1].temp.day) - 273.15) * 1.80 + 32) + degree);
                $("#temp3").text("Temperature: " + Math.round(((response.daily[2].temp.day) - 273.15) * 1.80 + 32) + degree);
                $("#temp4").text("Temperature: " + Math.round(((response.daily[3].temp.day) - 273.15) * 1.80 + 32) + degree);
                $("#temp5").text("Temperature: " + Math.round(((response.daily[4].temp.day) - 273.15) * 1.80 + 32) + degree);
                // Forecast for humidity
                $("#humidity1").text("Humidity: " + response.daily[0].humidity + "%");
                $("#humidity2").text("Humidity: " + response.daily[1].humidity + "%");
                $("#humidity3").text("Humidity: " + response.daily[2].humidity + "%");
                $("#humidity4").text("Humidity: " + response.daily[3].humidity + "%");
                $("#humidity5").text("Humidity: " + response.daily[4].humidity + "%");
                // This displays the weather icon for upcoming day
                // URLS to one call open weather api
                var iconURL0 = "https://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + ".png";
                var iconURL1 = "https://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + ".png";
                var iconURL2 = "https://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + ".png";
                var iconURL3 = "https://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + ".png";
                var iconURL4 = "https://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + ".png";
                // This displays icons to the appropriate
                $("#wicon1").attr("src", iconURL0);
                $("#wicon2").attr("src", iconURL1);
                $("#wicon3").attr("src", iconURL2);
                $("#wicon4").attr("src", iconURL3);
                $("#wicon5").attr("src", iconURL4);

                var uvIndex = response.current.uvi;
                if (uvIndex < 3) {
                    $("#uv").addClass("low");
                } else if (uvIndex < 6) {
                    $("#uv").addClass("moderate");
                } else if (uvIndex < 8) {
                    $("#uv").addClass("high");
                } else if (uvIndex < 11) {
                    $("#uv").addClass("extreme");
                }
            })
        })
        // This saves the users serached city to local storage
        storeCities();
    }
});

