// Get a reference to the "userProfile" collection in the database
var userProfileRef = firebase.firestore().collection("users");

// Call the "name" field from the "CPFlOFK1HpQe40v53VHX" document in the collection
userProfileRef.doc("CPFlOFK1HpQe40v53VHX").get().then(function(doc) {
  if (doc.exists) {
    var name = doc.data().name;
    console.log("Name from Firestore:", name);
    document.getElementById("card_title").innerHTML = name;
  } else {
    console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});