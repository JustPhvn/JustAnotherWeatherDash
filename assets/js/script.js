var city;
var longitude;
var latitude;
var cityBtns = [];

$("#searchBtn").on("click", function() {
  clearFields();
  weather();
});

$("#btnList").on("click", "button", function() {
  clearFields();
  localStorage.setItem("lastSearched", JSON.stringify(this.innerHTML));
  // console.log(this.innerHTML);
  var currentWeatherURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    this.innerHTML +
    "&appid=3a9affb571f01ec6f04a55e3f54b8056&units=imperial";
  var forecastURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    this.innerHTML +
    "&appid=3a9affb571f01ec6f04a55e3f54b8056&units=imperial";
  // console.log(currentWeatherURL);
  $.ajax({
    url: currentWeatherURL,
    method: "GET"
  }).then(function(response) {
    let icon =
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    let iconLink = $("<img>").attr("src", icon);
    console.log(response);
    longitude = response.coord.lon;
    latitude = response.coord.lat;
    $("#displayCity")
      .text(response.name + " (" + moment().format("L") + ")")
      .append(iconLink);
    let temp = $("<p>")
      .attr("class", "weatherStats")
      .text("Temperature: " + response.main.temp + "°F");
    let humidity = $("<p>")
      .attr("class", "weatherStats")
      .text("Humidity: " + response.main.humidity + "%");
    let windSpeed = $("<p>")
      .attr("class", "weatherStats")
      .text("Wind Speed: " + response.wind.speed + "MPH");
    $("#displayCity").append(temp, humidity, windSpeed);
    var uvURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=3a9affb571f01ec6f04a55e3f54b8056&lat=" +
      latitude +
      "&lon=" +
      longitude;
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      let uv = $("<p>").text("UV Index: " + response.value);
      if (response.value < 3) {
        uv.attr("class", "weatherStats favorableUV");
      } else if (response.value < 7) {
        uv.attr("class", "weatherStats moderateUV");
      } else {
        uv.attr("class", "weatherStats severeUV");
      }
      $("#displayCity").append(uv);
    });
    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      for (let i = 0; i < 37; i += 9) {
        let icon =
          "http://openweathermap.org/img/w/" +
          response.list[i].weather[0].icon +
          ".png";
        let iconLink = $("<img>").attr({
          src: icon,
          height: "50",
          width: "50"
        });
        let divWrap = $("<div>").attr("class", "col");
        let card = $("<div>").attr("class", "card text-white bg-info");
        let cardBody = $("<div>").attr("class", "card-body");
        let cardDate = $("<h5>")
          .attr("class", "card-title")
          .text(
            moment()
              .add(+1, "days")
              .format("L")
          );
        let cardTemp = $("<p>")
          .attr("class", "card-text")
          .text("Temp: " + response.list[i].main.temp + "°F");
        let cardHumidity = $("<p>")
          .attr("class", "card-text")
          .text("Humidity: " + response.list[i].main.humidity + "%");
        $("#fiveDayCast").append(
          divWrap.append(
            card
              .append(cardDate)
              .append(cardBody)
              .append(iconLink)
              .append(cardTemp)
              .append(cardHumidity)
          )
        );
      }
    });
  });
});

function weather() {
  city = $("#cityInput").val();
  localStorage.setItem("lastSearched", JSON.stringify(city));

  cityBtns.push(city);

  // console.log(cityBtns);
  localStorage.setItem("city", JSON.stringify(cityBtns));
  $(".btn-group-vertical").append(
    $("<button>")
      .attr("class", "btn btn-light")
      .text(city)
  );

  var currentWeatherURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=3a9affb571f01ec6f04a55e3f54b8056&units=imperial";

  var forecastURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=3a9affb571f01ec6f04a55e3f54b8056&units=imperial";

  // console.log(currentWeatherURL);

  $.ajax({
    url: currentWeatherURL,
    method: "GET"
  }).then(function(response) {
    let icon =
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    let iconLink = $("<img>").attr("src", icon);
    // console.log(response);
    longitude = response.coord.lon;
    latitude = response.coord.lat;

    $("#displayCity")
      .text(response.name + " (" + moment().format("L") + ")")
      .append(iconLink);
    let temp = $("<p>")
      .attr("class", "weatherStats")
      .text("Temperature: " + response.main.temp + "°F");
    let humidity = $("<p>")
      .attr("class", "weatherStats")
      .text("Humidity: " + response.main.humidity + "%");
    let windSpeed = $("<p>")
      .attr("class", "weatherStats")
      .text("Wind Speed: " + response.wind.speed + "MPH");
    $("#displayCity").append(temp, humidity, windSpeed);

    var uvURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=3a9affb571f01ec6f04a55e3f54b8056&lat=" +
      latitude +
      "&lon=" +
      longitude;
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      let uv = $("<p>").text("UV Index: " + response.value);
      if (response.value < 3) {
        uv.attr("class", "weatherStats favorableUV");
      } else if (response.value < 7) {
        uv.attr("class", "weatherStats moderateUV");
      } else {
        uv.attr("class", "weatherStats severeUV");
      }
      $("#displayCity").append(uv);
    });

    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      for (let i = 0; i < 5; i++) {
        let icon =
          "http://openweathermap.org/img/w/" +
          response.list[i].weather[0].icon +
          ".png";
        let iconLink = $("<img>").attr({
          src: icon,
          height: "50",
          width: "50"
        });
        let divWrap = $("<div>").attr("class", "col");
        let card = $("<div>").attr("class", "card text-white bg-info");
        let cardBody = $("<div>").attr("class", "card-body");
        let cardDate = $("<h5>")
          .attr("class", "card-title")
          .text(
            moment()
              .add(i + 1, "days")
              .format("L")
          );
        let cardTemp = $("<p>")
          .attr("class", "card-text")
          .text("Temp: " + response.list[i].main.temp + "°F");
        let cardHumidity = $("<p>")
          .attr("class", "card-text")
          .text("Humidity: " + response.list[i].main.humidity + "%");
        $("#fiveDayCast").append(
          divWrap.append(
            card
              .append(cardDate)
              .append(cardBody)
              .append(iconLink)
              .append(cardTemp)
              .append(cardHumidity)
          )
        );
      }
    });
  });
}

function clearFields() {
  $("#displayCity").empty();
  $("#fiveDayCast").empty();
}

if (localStorage.getItem("city") !== null) {
  cityBtns = JSON.parse(localStorage.getItem("city"));
  for (let i = 0; i < cityBtns.length; i++) {
    $(".btn-group-vertical").append(
      $("<button>")
        .attr("class", "btn btn-light")
        .text(cityBtns[i])
    );
  }
}

if (localStorage.getItem("lastSearched") !== null) {
  clearFields();
  let lastCity = JSON.parse(localStorage.getItem("lastSearched"));
  var currentWeatherURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    lastCity +
    "&appid=3a9affb571f01ec6f04a55e3f54b8056&units=imperial";

  var forecastURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    lastCity +
    "&appid=3a9affb571f01ec6f04a55e3f54b8056&units=imperial";

  // console.log(currentWeatherURL);

  $.ajax({
    url: currentWeatherURL,
    method: "GET"
  }).then(function(response) {
    let icon =
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    let iconLink = $("<img>").attr("src", icon);
    // console.log(response);
    longitude = response.coord.lon;
    latitude = response.coord.lat;

    $("#displayCity")
      .text(response.name + " (" + moment().format("L") + ")")
      .append(iconLink);
    let temp = $("<p>")
      .attr("class", "weatherStats")
      .text("Temperature: " + response.main.temp + "°F");
    let humidity = $("<p>")
      .attr("class", "weatherStats")
      .text("Humidity: " + response.main.humidity + "%");
    let windSpeed = $("<p>")
      .attr("class", "weatherStats")
      .text("Wind Speed: " + response.wind.speed + "MPH");
    $("#displayCity").append(temp, humidity, windSpeed);

    var uvURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=3a9affb571f01ec6f04a55e3f54b8056&lat=" +
      latitude +
      "&lon=" +
      longitude;
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      let uv = $("<p>").text("UV Index: " + response.value);
      if (response.value < 3) {
        uv.attr("class", "weatherStats favorableUV");
      } else if (response.value < 7) {
        uv.attr("class", "weatherStats moderateUV");
      } else {
        uv.attr("class", "weatherStats severeUV");
      }
      $("#displayCity").append(uv);
    });

    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      for (let i = 0; i < 5; i++) {
        let icon =
          "http://openweathermap.org/img/w/" +
          response.list[i].weather[0].icon +
          ".png";
        let iconLink = $("<img>").attr({
          src: icon,
          height: "50",
          width: "50"
        });
        let divWrap = $("<div>").attr("class", "col");
        let card = $("<div>").attr("class", "card text-white bg-info");
        let cardBody = $("<div>").attr("class", "card-body");
        let cardDate = $("<h5>")
          .attr("class", "card-title")
          .text(
            moment()
              .add(i + 1, "days")
              .format("L")
          );
        let cardTemp = $("<p>")
          .attr("class", "card-text")
          .text("Temp: " + response.list[i].main.temp + "°F");
        let cardHumidity = $("<p>")
          .attr("class", "card-text")
          .text("Humidity: " + response.list[i].main.humidity + "%");
        $("#fiveDayCast").append(
          divWrap.append(
            card
              .append(cardDate)
              .append(cardBody)
              .append(iconLink)
              .append(cardTemp)
              .append(cardHumidity)
          )
        );
      }
    });
  });
}
