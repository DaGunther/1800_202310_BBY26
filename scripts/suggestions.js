const outfits = firebase.firestore().collection("outfits");

let fitsArray = [];
let currentIndex = 0;

function showMyFits() {
  firebase.auth().onAuthStateChanged(user => {
    console.log("user is: " + user.uid);
    db.collection("users").doc(user.uid)
      .get()
      .then(doc => {
        myposts = doc.data().outfits;
        console.log(outfits);
        myposts.forEach(item => {
          db.collection("outfits")
            .doc(item)
            .get()
            .then(doc => {
              // Check if outfit meets weather and warmth criteria
              var testField1 = doc.data().weathercondition;
              var testField2 = doc.data().warmthlevel;
              if (testField1 === selectedWeather && testField2 === selectedWarmth) {
                // Add outfit to fitsArray
                //fitsArray.push(doc);
              }
              displayMyFits(doc);
            })
        })
      })
  })
}


function displayMyFits(doc) {
  var name = doc.data().name;
  var description = doc.data().description;
  var testField1 = doc.data().weathercondition;
  var testField2 = doc.data().warmthlevel;

  if (testField1 === selectedWeather && testField2 === selectedWarmth) {
    var fitsContainer = document.getElementById("fits-go-here");
    fitsContainer.innerHTML = '';

    if (doc.data().imageUrls) {
      var imageUrls = doc.data().imageUrls;
      for (var i = 0; i < imageUrls.length; i++) {
        var imageUrl = imageUrls[i];
        let newcard = document.getElementById("postCardTemplate").content.cloneNode(true);
        newcard.querySelector('.card-title').innerHTML = name;
        newcard.querySelector('.card-image').src = imageUrl;
        newcard.querySelector('.card-description').innerHTML = description;
        fitsContainer.appendChild(newcard);
        //fitsArray.push(newcard); // Add newcard to the fitsArray
        //console.log(fitsArray);
      }
      selectedOutfits.push(doc.id);
    } else {
      console.log('imageUrls property not found');
    }
  } else {
    console.log(selectedWeather);
    console.log(selectedWarmth);
    console.log(imageUrl);
    console.log('Your drip doesnt fit');
  }
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
      var temp = data.main.temp - 273.15; // Convert to Celsius
      var weather = data.weather[0].main;

      // Assign selectedWeather based on weather condition
      if (weather === "Clear") {
        selectedWeather = "clear";
      } else {
        selectedWeather = "rain";
      }

      // Assign selectedWarmth based on temperature
      if (temp < 0) {
        selectedWarmth = "coldest";
      } else if (temp < 10) {
        selectedWarmth = "cold";
      } else if (temp < 20) {
        selectedWarmth = "warm";
      } else {
        selectedWarmth = "warmer";
      }

      // Clear selectedOutfits array and display fits
      selectedOutfits = [];
      showMyFits();
    })
    .catch((error) => console.log(error));
}

document.getElementById("suggest-btn").addEventListener("click", function () {
  getLocation();
});

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      getWeather(lat, lon);
      //getNextFit(); // Call getNextFit() after getWeather()
    },
    (error) => console.log(error)
  );
}

// function getNextFit() {
//   // If all outfits have been displayed, stop the loop
//   if (currentIndex === fitsArray.length) {
//     return;
//   }

//   // Show current fit and hide others
//   fitsArray.forEach((fit, index) => {
//     if (index === currentIndex) {
//       fit.style.display = "block";
//     } else {
//       fit.style.display = "none";
//     }
//   });

//   // Increment index
//   currentIndex++;

//   // If all outfits have been displayed, reset the index to 0
//   if (currentIndex === fitsArray.length) {
//     currentIndex = 0;
//   }
// }
