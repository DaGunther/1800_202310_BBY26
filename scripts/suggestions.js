// import { temperature } from './WeatherAPI.js';
var outfits = firebase.firestore().collection("outfits");

//-------------------------------------------------
// this function shows finds out who is logged in,
// reads the "myposts" field (an array) for that user, 
// reads the details for each item in the array
// and displays a card for each item. 
//------------------------------------------------
function showMyFits() {
  firebase.auth().onAuthStateChanged(user => {
        console.log("user is: " + user.uid);
        db.collection("users").doc(user.uid)
                .get()
                .then(doc => {
                    myposts = doc.data().outfits; //get array of my posts
                    console.log(outfits);
                    myposts.forEach(item => {
                        db.collection("outfits")
                            .doc(item)
                            .get()
                            .then(doc => {
                                displayMyFits(doc);
                            })
                    })
                })
  })
}

//------------------------------------------------------------
// this function displays ONE card, with information
// from the post document extracted (name, description, image)
//------------------------------------------------------------
function displayMyFits(doc) {
  var name = doc.data().name;
  var description = doc.data().description;
  var testField1 = doc.data().weathercondition;
  var testField2 = doc.data().warmthlevel;

  if (testField1 === 'clear' && testField2 === 'warm') {
    // Check if the imageUrls property exists in the document data
    if (doc.data().imageUrls) {
      var imageUrls = doc.data().imageUrls;
      // Iterate over all the imageURLs in the array
      for (var i = 0; i < imageUrls.length; i++) {
        var imageUrl = imageUrls[i];
        // Clone the new card
        let newcard = document.getElementById("postCardTemplate").content.cloneNode(true);
        // Populate with title, image, and description
        newcard.querySelector('.card-title').innerHTML = name;
        newcard.querySelector('.card-image').src = imageUrl;
        newcard.querySelector('.card-description').innerHTML = description;
        // Append to the container
        document.getElementById("fits-go-here").appendChild(newcard);
      }
    } else {
      console.log('imageUrls property not found');
      // Do something when imageUrls property is not found
    }
  } else {
    console.log('Your drip doesnt fit');
    // Do something when test field value is not clear
  }
}




// function suggestedFit() {
//     if (temp >= 30) {
//         return "It's hot outside! Why not go for a swim?";
//       } else if (temp >= 20 && temp < 30) {
//         return "The weather is perfect for a picnic!";
//       } else if (temp >= 10 && temp < 20) {
//         return "It's a bit chilly outside. How about a hike?";
//       } else {
//         return "Brrr, it's cold! Stay indoors and curl up with a good book.";
//       }
// }

// suggestedFit();