
var userProfileRef = firebase.firestore().collection("users");


userProfileRef.doc("i93pqeViieYQoFaHzpQxzXRsyik2").get().then(function (doc) {
  if (doc.exists) {
    var name = doc.data().name;
    console.log("Name from Firestore:", name);
    document.getElementById("card_title-1").innerHTML = name;
  } else {
    console.log("No such document!");
  }
}).catch(function (error) {
  console.log("Error getting document:", error);
});

const productId = "iPuECoVwZqkN2uVxHukC"; 
const productRef = firebase.firestore().collection('posts').doc(productId);
const productQuery = productRef.get();

productQuery.then((productDoc) => {
  const productData = productDoc.data();
  const imageUrl = productData.image; 

  const imgElement = document.getElementById('card-image-1');
  imgElement.src = imageUrl;
});

const productId1 = "iPuECoVwZqkN2uVxHukC"; 
const productRef1 = firebase.firestore().collection('posts').doc(productId1);
const productQuery1 = productRef1.get();

productQuery1.then((productDoc) => {
  const productData = productDoc.data();
  const description = productData.description; 

  const descriptionElement = document.getElementById('card-des-1');
  descriptionElement.textContent = description;
});





// Get a reference to the "userProfile" collection in the database
var userProfileRef = firebase.firestore().collection("users");

// Call the "name" field from the "i93pqeViieYQoFaHzpQxzXRsyik2" document in the collection
userProfileRef.doc("NF1PhLYr4tVB3cNu1iaGN9Wjsny2").get().then(function (doc) {
  if (doc.exists) {
    var name = doc.data().name;
    console.log("Name from Firestore:", name);
    document.getElementById("card_title-2").innerHTML = name;
  } else {
    console.log("No such document!");
  }
}).catch(function (error) {
  console.log("Error getting document:", error);
});

const productId3 = "Gzvt3SDv6XOOCEtKH3y6"; // Replace with your specific document ID
const productRef3 = firebase.firestore().collection('posts').doc(productId3);
const productQuery3 = productRef3.get();

productQuery3.then((productDoc) => {
  const productData = productDoc.data();
  const imageUrl = productData.image; // Extract the URL from the 'image' field

  const imgElement = document.getElementById('card-image-2');
  imgElement.src = imageUrl;
});

const productId4 = "Gzvt3SDv6XOOCEtKH3y6"; // Replace with your specific document ID
const productRef4 = firebase.firestore().collection('posts').doc(productId4);
const productQuery4 = productRef4.get();

productQuery4.then((productDoc) => {
  const productData = productDoc.data();
  const description = productData.description; // Extract the description from the 'description' field

  const descriptionElement = document.getElementById('card-des-2');
  descriptionElement.textContent = description;
});



// Get a reference to the "userProfile" collection in the database
var userProfileRef = firebase.firestore().collection("users");

// Call the "name" field from the "i93pqeViieYQoFaHzpQxzXRsyik2" document in the collection
userProfileRef.doc("bDJ5wcTsNMZPI85X7R6rXKxgTFI2").get().then(function (doc) {
  if (doc.exists) {
    var name = doc.data().name;
    console.log("Name from Firestore:", name);
    document.getElementById("card_title-3").innerHTML = name;
  } else {
    console.log("No such document!");
  }
}).catch(function (error) {
  console.log("Error getting document:", error);
});

const productId5 = "e1kq5qGI1tiA7EymbfeA"; // Replace with your specific document ID
const productRef5 = firebase.firestore().collection('posts').doc(productId5);
const productQuery5 = productRef5.get();

productQuery5.then((productDoc) => {
  const productData = productDoc.data();
  const imageUrl = productData.image; // Extract the URL from the 'image' field

  const imgElement = document.getElementById('card-image-3');
  imgElement.src = imageUrl;
});

const productId6 = "e1kq5qGI1tiA7EymbfeA"; // Replace with your specific document ID
const productRef6 = firebase.firestore().collection('posts').doc(productId6);
const productQuery6 = productRef6.get();

productQuery6.then((productDoc) => {
  const productData = productDoc.data();
  const description = productData.description; // Extract the description from the 'description' field

  const descriptionElement = document.getElementById('card-des-3');
  descriptionElement.textContent = description;
});