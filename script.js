var weatherSearch = "";
//Gets Date from JavaScript
var year = new Date().getFullYear();
var month = new Date().getMonth() + 1;
var day = new Date().getDate();
$("#searchButton").on("click", function () {
  weatherSearch = $("#weather-input").val().trim();
  console.log(weatherSearch);
  callWeather();
  callFiveDay();
})

function callWeather() {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherSearch + "&appid=f08e0e7293a9c130de4d782ff1db313d";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    //Empties the weather-append div when button is pressed
    $("#weather-append").empty();
    //Converts to Fahrenheit from Kelvin
    var fahrenheit = ((parseInt((response.main.temp) - 273.15) * 9 / 5 + 32)).toFixed();
    //Grabs Humidity from response
    var humidity = response.main.humidity + "%";
    //Grabs wind from response
    var wind = response.wind.speed;
    //Creates the card for the current weather
    var cardBody = $("<div>").addClass("card-body");
    var cardTitle = $("<h3>").addClass("card-title").text(response.name + " " + month + "/" + day + "/" + year);
    var cardTemp = $("<p>").text("Temperature: " + fahrenheit);
    var cardHumidity = $("<p>").text("Humidity: " + humidity);
    var cardWind = $("<p>").text("Wind Speed: " + wind);
    //Appends Weather to the page
    $("#weather-append").append(cardBody, cardTitle, cardTemp, cardHumidity, cardWind);
    callUVIndex(response.coord.lat, response.coord.lon);
  })
}
//New API call for the UV index
function callUVIndex(lat, lon) {
  var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=f08e0e7293a9c130de4d782ff1db313d"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var uv = response.value;
    console.log(uv);
    var cardUV = $("<p>").text("UV Index: " + uv);
    $("#weather-append").append(cardUV);
  })
}
function callFiveDay () {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + weatherSearch + "&appid=f08e0e7293a9c130de4d782ff1db313d"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var dayArray = response.list;
    for (var i = 0; i < 5; i++) {
      var dayIndex = dayArray[i];
      var dayIncrement = day++;
      var fahrenheit = ((parseInt((dayIndex.main.temp) - 273.15) * 9 / 5 + 32)).toFixed();
      var cardBody = $("<div>").addClass("card-body");
      var cardTitle = $("<h3>").addClass("card-title").text(month + "/" + dayIncrement + "/" + year);
      var cardTemp = $("<p>").text("Temperature: " + fahrenheit);
      $("#fiveday-append").append(cardBody, cardTitle, cardTemp);
      console.log(dayIndex);
      console.log(dayIncrement);
    }
  })
}