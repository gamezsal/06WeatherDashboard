var searchHistory = JSON.parse(localStorage.getItem("cities")) || [];


$("#searchButton").on("click", function () {
  var searchData = $("#weather-input").val().trim();
  console.log(searchData);
  callWeatherTemps(searchData);
});

function callWeatherTemps(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=6ec271a7eaa197efb35f9b736da2f3eb";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    searchHistory.unshift(response.name)
    localStorage.setItem("cities", JSON.stringify(searchHistory))
    displaySearchHistory(searchHistory)

    //Empties the weather-append div when button is pressed
    $("#weather-append").empty();
    //Converts to Fahrenheit from Kelvin
    var fahrenheit = (
      (parseInt(response.main.temp - 273.15) * 9) / 5 +
      32
    ).toFixed();
    //Grabs Humidity from response
    var humidity = response.main.humidity + "%";
    //Grabs wind from response
    var wind = response.wind.speed;
    //Creates the card for the current weather
    var cardBody = $("<div>").addClass("card-body");
    var cardTitle = $("<h3>")
      .addClass("card-title")
      .text(response.name + " " + new Date().toLocaleDateString());
    var cardTemp = $("<p>").text("Temperature: " + fahrenheit);
    var cardHumidity = $("<p>").text("Humidity: " + humidity);
    var cardWind = $("<p>").text("Wind Speed: " + wind);
    //Appends Weather to the page
    $("#weather-append").append(
      cardBody,
      cardTitle,
      cardTemp,
      cardHumidity,
      cardWind
    );
    callUVIndex(response.coord.lat, response.coord.lon);
    callFiveDay(response.coord.lat, response.coord.lon);
  });
}
//New API call for the UV index
function callUVIndex(lat, lon) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=6ec271a7eaa197efb35f9b736da2f3eb";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var uv = response.value;
    console.log(uv);
    var cardUV = $("<p>").text("UV Index: " + uv);
    $("#weather-append").append(cardUV);
  });
}
//New API call to get the 5 day forecast
function callFiveDay(lat, lon) {
  
  var queryURL =
    " https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=6ec271a7eaa197efb35f9b736da2f3eb";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var dayArray = response.daily;
    for (var i = 0; i < 5; i++) {
      var forecastWeather = dayArray[i + 1];

      var date = new Date(forecastWeather.dt * 1000);
      console.log(date);
      var fahrenheit = (
        (parseInt(forecastWeather.temp.day - 273.15) * 9) / 5 +
        32
      ).toFixed();
      var cardBody = $("<div>").addClass("card-body");
      var cardTitle = $("<h3>")
        .addClass("card-title")
        .text(date.toLocaleDateString());
      var cardTemp = $("<p>").text("Temperature: " + fahrenheit);
      $("#fiveday-append").append(cardBody, cardTitle, cardTemp);
    }
  });
}

//Display the search history of preveious city searches
function displaySearchHistory(cities) {
  $("#search-history").empty();
  for (var i = 0; i < cities.length; i++) {
    let city = cities[i];
    var li = $("<li>").addClass("list-group-item").text(city);
    li.on("click", function(){
      callWeatherTemps(city);
    })
    $("#search-history").append(li);
  }
}

displaySearchHistory(searchHistory);