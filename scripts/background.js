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
        // var temp = data.main.temp - 273.15; // Convert to Celsius
        var weather = data.weather[0].main;
        // tempdisplay = Math.round(temp * 10) / 10;
        // weatherdisplay = weather;
  
        // // Assign selectedWeather based on weather condition
        // if (weather === "Clear") {
        //   selectedWeather = "clear";
        // } else {
        //   selectedWeather = "rain";
        // }
  
        // // Assign selectedWarmth based on temperature
        // if (temp < 0) {
        //   selectedWarmth = "coldest";
        // } else if (temp < 10) {
        //   selectedWarmth = "cold";
        // } else if (temp < 20) {
        //   selectedWarmth = "warm";
        // } else {
        //   selectedWarmth = "warmer";
        // }
  
        // Set background image based on weather condition
        var container = document.getElementById("background");
        if (weather === "Clear") {
          container.style.backgroundImage = "url(images/sunny.jpg)";
        } else if (weather === "Rain") {
          container.style.backgroundImage = "url(images/clouds.png)";
        } else if (weather === "Clouds") {
          container.style.backgroundImage = "url(images/clouds.png)";
        } else {
          container.style.backgroundImage = "url(default.jpg)";
        }

      })
      .catch((error) => console.log(error));
  }function setWeatherBackground(lat, lon) {
    // Your weather API code here
  
    // Set background image based on weather condition
    var container = document.getElementById("background");
    if (weather === "Clear") {
      container.classList.add("sunny_bg");
    } else if (weather === "Rain") {
      container.classList.add("rainy_bg");
    } else if (weather === "Clouds") {
      container.classList.add("cloudy_bg");
    } else {
      container.classList.add("default_bg");
    }
  }

  getLocation();
  