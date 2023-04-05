var urlParams = new URLSearchParams(window.location.search);
var outfitId = urlParams.get('id');

var docRef = firebase.firestore().collection("outfits").doc(outfitId);

docRef.get().then(function(doc) {
  if (doc.exists) {
    // Set the values of the HTML elements based on the outfit data
    $("#name").text(doc.data().name);
    $("#image").attr("src", doc.data().image);
    $("#weathercondition").text(doc.data().weatherCondition);
    $("#warmthlevel").text(doc.data().warmthLevel);
    $("#description").text(doc.data().description);
  } else {
    console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});
