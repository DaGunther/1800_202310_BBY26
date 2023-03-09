function insertNameFromFirestore(){
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user =>{
        if (user){
           console.log(user.uid); // let me to know who is the user that logged in to get the UID
           currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
           currentUser.get().then(userDoc=>{
               //get the user name
               var userName= userDoc.data().name;
               console.log(userName);
               //$("#name-goes-here").text(userName); //jquery
               document.getElementById("name-goes-here").innerText=userName;
           })    
       }    
    })
}
insertNameFromFirestore();

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("profileCardTemplate");

  db.collection(collection).get()   //the collection called "hikes"
      .then(userProfiles=> {
          //var i = 1;  //Optional: if you want to have a unique ID for each hike
          userProfiles.forEach(doc => { //iterate thru each doc
              var title = doc.data().name;       // get value of the "name" key
              var details = doc.data().height;  // get value of the "details" key
              var hikeCode = doc.data().gender;    //get unique ID to each hike to be used for fetching right image
              var hikeLength = doc.data().age; //gets the length field
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

displayCardsDynamically("userProfile");  //input param is the name of the collection