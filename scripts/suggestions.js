const outfits = firebase.firestore().collection("outfits");

let tempdisplay = 0;
let weatherdisplay = "";
let outfitDisplayed = false;
let currentOutfitIndex = -1;
let selectedWeather = "";
let selectedWarmth = "";

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
      var temp = data.main.temp - 273.15; // Convert to Celsius
      var weather = data.weather[0].main;
      tempdisplay = Math.round(temp * 10) / 10;
      weatherdisplay = weather;

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
      // Call showMyFits() after getWeather()
      showMyFits();
    })
    .catch((error) => console.log(error));
}

function showMyFits(startIndex = 0) {
  firebase.auth().onAuthStateChanged(user => {
    console.log("user is: " + user.uid);
    db.collection("users").doc(user.uid)
      .get()
      .then(doc => {
        myposts = doc.data().outfits;
        console.log(outfits);

        let foundSuitableOutfit = false;
        
        for (let i = startIndex; i < myposts.length; i++) {
          const item = myposts[i];
          db.collection("outfits")
            .doc(item)
            .get()
            .then(doc => {
              // Check if outfit meets weather and warmth criteria
              var testField1 = doc.data().weathercondition;
              var testField2 = doc.data().warmthlevel;
              if (testField1 === selectedWeather && testField2 === selectedWarmth) {
                // Display the new outfit card
                displayMyFits(doc);
                outfitDisplayed = true;
                currentOutfitIndex = i;
                foundSuitableOutfit = true;
              }
            })
            .then(() => {
              if (!foundSuitableOutfit && i === myposts.length - 1) {
                // If no suitable outfit was found and it's the last item, try again with the incremented index
                showMyFits(startIndex + 1);
              }
            });
        }
      });
  });
}

function displayMyFits(doc) {
  if (outfitDisplayed) return;

  var fitsContainer = document.getElementById("fits-go-here");
  fitsContainer.innerHTML = '';

  var name = doc.data().name;
  var description = "The weather is \"" + weatherdisplay
    + "\" and it is " + tempdisplay + " degrees Celsius. \nWe recommend this outfit.";
  var testField1 = doc.data().weathercondition;
  var testField2 = doc.data().warmthlevel;

  if (testField1 === selectedWeather && testField2 === selectedWarmth) {
    var fitsContainer = document.getElementById("fits-go-here");

    if (doc.data().imageUrls) {
      var imageUrls = doc.data().imageUrls;
      for (var i = 0; i < imageUrls.length; i++) {
        var imageUrl = imageUrls[i];
        let newcard = document.getElementById("postCardTemplate").content.cloneNode(true);
        newcard.querySelector('.card-title').innerHTML = name;
        newcard.querySelector('.card-image').src = imageUrl;
        newcard.querySelector('.card-description').innerHTML = description;
        newcard.querySelector('.card').classList.add('spin'); // Add the spin class to the card
        fitsContainer.appendChild(newcard);
      }
      outfitDisplayed = true;
    } else {
      console.log('imageUrls property not found');
    }
  } else {
    console.log(selectedWeather);
    console.log(selectedWarmth);
    console.log(imageUrl);
    console.log('That drip doesnt fit');
  }
}


const myButton = document.getElementById("button1");
const myButton2 = document.getElementById("button2");
const loadingMsg = document.getElementById("loading");
const loadingMsg2 = document.getElementById("loading1");
myButton2.style.display = "none";

document.getElementById("button1").addEventListener("click", function () {
  // hide button1
  myButton.style.display = "none";

  // show "loading" message
  loadingMsg.style.display = "block";

  // delay the getLocation() function call by 2 seconds
  setTimeout(function() {
    loadingMsg.style.display = "none";
    loadingMsg2.style.display = "block";
    setTimeout(function() {
      loadingMsg2.style.display = "none";
  
      getLocation();
  
      // hide "loading" message
  
      // show button2
      setTimeout(function() {
        myButton2.style.display = "block";
  
      }, 3000);
    }, 3000);
  }, 3000);

});

const cardSuggestion = document.getElementsById("display");

document.getElementById("button2").addEventListener("click", function () {
  outfitDisplayed = false; // Reset the outfitDisplayed flag
  cardSuggestion.style.display = "none";
  showMyFits(currentOutfitIndex + 1);
});

