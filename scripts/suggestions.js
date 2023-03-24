import { temperature } from './WeatherAPI.js';
var outfits = firebase.firestore().collection("outfits");

function showMyOutfits() {
  firebase.auth().onAuthStateChanged(function (user) {
     if (user) {
         // User is signed in.
         // Do something for the user here. 

         // Go to get the user's document
         db.collection("users").doc(user.uid).get()
             .then(doc => {
                 console.log(doc.data());

                 // Extract the array for myposts
                 var myposts = doc.data().myposts;

                 // Iterate thru the array
                 myposts.forEach(item => {
                     console.log(item);

                     // For each item in array, read the post document
                     db.collection("outfits").doc(item)
                     .get()
                     .then(doc =>{
                         // Output details about that Post
                         console.log(doc.data().description);
                         displayCardPost(doc.data());
                     })
                 })
             })
     } else {
         // No user is signed in.
         console.log("Error: no user is logged in");   
     } 
 })
}
showMyOutfits();

function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("hikeCardTemplate");

  db.collection(collection).get()   //the collection called "hikes"
      .then(allHikes=> {
          //var i = 1;  //Optional: if you want to have a unique ID for each hike
          allHikes.forEach(doc => { //iterate thru each doc
              var title = doc.data().name;       // get value of the "name" key
              var details = doc.data().details;  // get value of the "details" key
      var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
              var hikeLength = doc.data().length; //gets the length field
              var docID = doc.id;
              let newcard = cardTemplate.content.cloneNode(true);

              //update title and text and image
              newcard.querySelector('.card-title').innerHTML = title;
              newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
              newcard.querySelector('.card-text').innerHTML = details;
              newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
              newcard.querySelector('a').href = "eachHike.html?docID="+docID;

              //Optional: give unique ids to all elements for future use
              // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
              // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
              // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

              //attach to gallery, Example: "hikes-go-here"
              document.getElementById(collection + "-go-here").appendChild(newcard);

              //i++;   //Optional: iterate variable to serve as unique ID
          })
      })
}

displayCardsDynamically("users");  //input param is the name of the collection


function suggestedFit() {
    if (temp >= 30) {
        return "It's hot outside! Why not go for a swim?";
      } else if (temp >= 20 && temp < 30) {
        return "The weather is perfect for a picnic!";
      } else if (temp >= 10 && temp < 20) {
        return "It's a bit chilly outside. How about a hike?";
      } else {
        return "Brrr, it's cold! Stay indoors and curl up with a good book.";
      }
}

suggestedFit();