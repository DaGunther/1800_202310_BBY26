const form = document.querySelector('#outfit-form');
const storageRef = firebase.storage().ref();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = form.name.value;
  const description = form.description.value;
  const images = form.image.files;
  const weathercondition = form.weathercondition.value;
  const warmthlevel = form.warmthlevel.value;
  
  // Upload images to Firebase Storage and get download URLs
  const downloadUrls = [];
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const imageRef = storageRef.child(`outfits/${firebase.auth().currentUser.uid}/${name}/${image.name}`);
    const snapshot = await imageRef.put(image);
    const downloadUrl = await snapshot.ref.getDownloadURL();
    downloadUrls.push(downloadUrl);
  }
  
  // Save outfit data to Firestore
  const outfitRef = await db.collection('outfits').add({
    name,
    description,
    weathercondition,
    warmthlevel,
    imageUrls: downloadUrls,
    userId: firebase.auth().currentUser.uid
  });
  
  // Add outfit ID to user's outfits array in Firestore
  const userRef = db.collection('users').doc(firebase.auth().currentUser.uid);
  await userRef.update({
    outfits: firebase.firestore.FieldValue.arrayUnion(outfitRef.id)
  });
  
  // Clear form inputs
  form.name.value = '';
  form.description.value = '';
  form.image.value = '';
  form.weathercondition.value = '';
  form.warmthlevel = '';
  
  var opacity = 0;
var intervalID = setInterval(fade, 20); // decrease interval time to 20ms

function fade() {
  var element = document.getElementById("fade");
  opacity += 0.05; // increase opacity faster
  element.style.opacity = opacity;
  if (opacity >= 1) {
    clearInterval(intervalID);
    setTimeout(function() {
      intervalID = setInterval(fadeOut, 20); // decrease interval time for fadeOut
    }, 2000); // wait 2 seconds before fading out
  }
}

function fadeOut() {
  var element = document.getElementById("fade");
  opacity -= 0.05; // decrease opacity faster
  element.style.opacity = opacity;
  if (opacity <= 0) {
    clearInterval(intervalID);
  }
}

});


// // Retrieve the user's outfits
// firebase.auth().onAuthStateChanged(async (user) => {
//   if (user) {
//     const userId = user.uid;
//     const outfitsRef = db.collection('outfits').where('userId', '==', userId);
//     const outfitsSnapshot = await outfitsRef.get();
//     const outfits = outfitsSnapshot.docs.map((doc) => doc.data());
//     console.log('User outfits:', outfits);
//   } else {
//     console.log('No user signed in.');
//   }
// });
