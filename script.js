var searchData = "";

//API GET function to the weather channel
function citySearch(searchData) {
  var city = $(this).attr("city-name");
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchData +
    "&appid=6ec271a7eaa197efb35f9b736da2f3eb";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var cityDiv = $("<div class='card'>");
    var returnMain = response.weather;
    var cityOne = $("<li>").text("City Name: " + returnMain);
    cityDiv.append(cityOne);

    console.log(response.weather);
    citySearch();
  });
}

//Return results from search parameter when seached is clicked.
$("#searchBtn").on("click", function (e) {
  e.preventDefault();
  searchData = $("#searchInput").val();
  citySearch(searchData);
  console.log(searchData);
});


