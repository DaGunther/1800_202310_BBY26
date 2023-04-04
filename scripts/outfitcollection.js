const outfits = firebase.firestore().collection("outfits");

function showMyFits(startIndex = 0) {
  firebase.auth().onAuthStateChanged(user => {
    console.log("user is: " + user.uid);
    db.collection("users").doc(user.uid)
      .get()
      .then(doc => {
        myposts = doc.data().outfits;
        console.log(outfits);

        for (let i = startIndex; i < myposts.length; i++) {
          const item = myposts[i];
          db.collection("outfits")
            .doc(item)
            .get()
            .then(doc => {
              // Display the outfit card
              displayMyFits(doc);
            })
            .then(() => {
              if (i === myposts.length - 1) {
                // If it's the last item, we're done
                outfitDisplayed = true;
              }
            });
        }
      });
  });
}
showMyFits();

function displayMyFits(doc, outfitDisplayed) {
  if (outfitDisplayed) return;

  var fitsContainer = document.getElementById("fits-go-here");

  var name = doc.data().name;
  var description = "We recommend this outfit.";

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
  } else {
    console.log('imageUrls property not found');
  }
}
