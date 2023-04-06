function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      getWeather(lat, lon);
    },
    (error) => console.log(error)
  );
}

function getWeather(lat, lon) {
  var apiKey = "2bf5db39bb937c37fad2d2df04ff5fed";
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      var weather = data.weather[0].main;
      var background = document.querySelector("#background");

      if (weather === "Clear") {
        background.style.backgroundImage = "url(images/sunny.jpg)";
      } else if (weather === "Rain") {
        background.style.backgroundImage = "url(images/clouds.png)";
      } else if (weather === "Clouds") {
        background.style.backgroundImage = "url(images/clouds.png)";
      } else {
        background.style.backgroundImage = "url(default.jpg)";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}