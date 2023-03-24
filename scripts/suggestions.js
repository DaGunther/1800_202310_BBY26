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
        var name = doc.data().name; // get value of the "name" key
        var description = doc.data().description; //gets the length field
        var image = doc.data().imageUrls; //the field that contains the URL 

        //clone the new card
        let newcard = document.getElementById("postCardTemplate").content.cloneNode(true);
        //populate with title, image
        newcard.querySelector('.card-title').innerHTML = name;
        newcard.querySelector('.card-image').src = image;
        newcard.querySelector('.card-description').innerHTML = description;
        //append to the posts
        document.getElementById("fits-go-here").append(newcard);
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