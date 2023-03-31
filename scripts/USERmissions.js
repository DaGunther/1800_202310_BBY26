
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

const ratings1 = document.getElementsByName('rating1');
let ratingValue1;
let isLocked1 = false;
const message1 = document.getElementById('message1');

for (let i = 0; i < ratings1.length; i++) {
  ratings1[i].addEventListener('click', function() {
    if (!isLocked1) {
      ratingValue1 = this.value;
      message1.innerText = `You rated it ${ratingValue1} drip score!`;
    }
  });
}


const ratings2 = document.getElementsByName('rating2');
let ratingValue2;
let isLocked2 = false;
const message2 = document.getElementById('message2');

for (let i = 0; i < ratings2.length; i++) {
  ratings2[i].addEventListener('click', function() {
    if (!isLocked2) {
      ratingValue2 = this.value;
      message2.innerText = `You rated it ${ratingValue2} drip score!`;
    }
  });
}


const ratings3 = document.getElementsByName('rating3');
let ratingValue3;
let isLocked3 = false;
const message3 = document.getElementById('message3');

for (let i = 0; i < ratings1.length; i++) {
  ratings3[i].addEventListener('click', function() {
    if (!isLocked3) {
      ratingValue3 = this.value;
      message3.innerText = `You rated it ${ratingValue3} drip score!`;
    }
  });
}


// Rating1
const ratingInputs1 = document.querySelectorAll('.rating1 input[type="radio"]');
const averageRating1 = document.createElement('span');
averageRating1.classList.add('average-rating');
const ratingContainer1 = document.querySelector('.rating1');
ratingContainer1.appendChild(averageRating1);

const docRef1 = db.collection('posts').doc('iPuECoVwZqkN2uVxHukC');

ratingInputs1.forEach(input => {
  input.addEventListener('change', e => {
    const rating = e.target.value;

    docRef1.update({
      totalRating: firebase.firestore.FieldValue.increment(+rating),
      ratingCount: firebase.firestore.FieldValue.increment(1)
    })
    .then(() => {
      console.log('Rating saved successfully');
    })
    .catch(error => {
      console.error('Error saving rating:', error);
    });
  });
});

docRef1.onSnapshot(snapshot => {
  const data = snapshot.data();
  if (data) {
    const totalRating = data.totalRating || 0;
    const ratingCount = data.ratingCount || 0;
    const average = totalRating / ratingCount;
    rating_message1.innerText = `Average rating: ${average.toFixed(1)}`;
  }
});

// Rating2
const ratingInputs2 = document.querySelectorAll('.rating2 input[type="radio"]');
const averageRating2 = document.createElement('span');
averageRating2.classList.add('average-rating');
const ratingContainer2 = document.querySelector('.rating2');
ratingContainer2.appendChild(averageRating2);

const docRef2 = db.collection('posts').doc('Gzvt3SDv6XOOCEtKH3y6');

ratingInputs2.forEach(input => {
  input.addEventListener('change', e => {
    const rating = e.target.value;

    docRef2.update({
      totalRating: firebase.firestore.FieldValue.increment(+rating),
      ratingCount: firebase.firestore.FieldValue.increment(1)
    })
    .then(() => {
      console.log('Rating saved successfully');
    })
    .catch(error => {
      console.error('Error saving rating:', error);
    });
  });
});

docRef2.onSnapshot(snapshot => {
  const data = snapshot.data();
  if (data) {
    const totalRating = data.totalRating || 0;
    const ratingCount = data.ratingCount || 0;
    const average = totalRating / ratingCount;
    rating_message2.innerText = `Average rating: ${average.toFixed(2)}`;
  }
});

// Rating3
const ratingInputs3 = document.querySelectorAll('.rating3 input[type="radio"]');
const averageRating3 = document.createElement('span');
averageRating3.classList.add('average-rating');
const ratingContainer3 = document.querySelector('.rating3');
ratingContainer3.appendChild(averageRating3);

const docRef3 = db.collection('posts').doc('e1kq5qGI1tiA7EymbfeA');

ratingInputs3.forEach(input => {
  input.addEventListener('change', e => {
    const rating = e.target.value;

    docRef3.update({
      totalRating: firebase.firestore.FieldValue.increment(+rating),
      ratingCount: firebase.firestore.FieldValue.increment(1)
    })
    .then(() => {
      console.log('Rating saved successfully');
    })
    .catch(error => {
      console.error('Error saving rating:', error);
    });
  });
});

docRef3.onSnapshot(snapshot => {
  const data = snapshot.data();
  if (data) {
    const totalRating = data.totalRating || 0;
    const ratingCount = data.ratingCount || 0;
    const average = totalRating / ratingCount;
    rating_message3.innerText = `Average rating: ${average.toFixed(3)}`;
  }
});