function insertNameFromFirestore() {
    //check if user is logged in
    firebase.auth().onAuthStateChanged( user => {
        if ( user ) { //if user logged in
            console.log( user.uid )
            db.collection( "users" ).doc( user.uid ).get().then( userDoc => {
                console.log( userDoc.data().name )
                userName = userDoc.data().name;
                console.log( userName )
                document.getElementById( "name-goes-here" ).innerHTML = userName;

            } )
        }
    } )

}
insertNameFromFirestore();

function insertCityFromFirestore() {
    //check if user is logged in
    firebase.auth().onAuthStateChanged( user => {
        if ( user ) { //if user logged in
            console.log( user.uid )
            db.collection( "users" ).doc( user.uid ).get().then( userDoc => {
                console.log( userDoc.data().City )
                userCity = userDoc.data().City;
                console.log( userName )
                document.getElementById( "city-goes-here" ).innerHTML = userCity;

            } )
        }
    } )

}
insertCityFromFirestore();

function insertAboutFromFirestore() {
    //check if user is logged in
    firebase.auth().onAuthStateChanged( user => {
        if ( user ) { //if user logged in
            console.log( user.uid )
            db.collection( "users" ).doc( user.uid ).get().then( userDoc => {
                console.log( userDoc.data().About )
                userAbout = userDoc.data().About;
                console.log( userAbout )
                document.getElementById( "about-goes-here" ).innerHTML = userAbout;

            } )
        }
    } )

}
insertAboutFromFirestore();

function insertPicFromFirestore() {
    //check if user is logged in
    firebase.auth().onAuthStateChanged( user => {
        if ( user ) { //if user logged in
            console.log( user.uid )
            db.collection( "users" ).doc( user.uid ).get().then( userDoc => {
                console.log( userDoc.data().profilePic )
                userAbout = userDoc.data().profilePic;
                console.log( userAbout )
                let picUrl = userDoc.data().profilePic;
                $("#mypic-goes-here").attr("src", picUrl);

            } )
        }
    } )

}

insertPicFromFirestore();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const userProfileRef = firebase.firestore().collection("users").doc(user.uid);
        userProfileRef.get().then(function (doc) {
            if (doc.exists) {
                const name = doc.data().name;
                const city = doc.data().city;
                console.log("Name from Firestore:", name);
                document.getElementById("name-goes-here").innerHTML = name;
                document.getElementById("city-goes-here").innerHTML = city;
              } else {
                console.log("No such document!");
              }
            }).catch(function (error) {
              console.log("Error getting document:", error);
            });
      
            // Get user's post
      firebase.firestore().collection('posts').where("owner", "==", user.uid).limit(3).get().then(function(querySnapshot) {
        let postCardsHtml = "";
        querySnapshot.forEach(function(doc) {
          const productData = doc.data();
          const imageUrl = productData.image;
          const title = productData.title;
          const description = productData.description;
  
          const postCardHtml = `
          <div class="col">
            <div class="card">
              <img src="${imageUrl}" class="card-img-top" alt="Outfit Image" style="max-height: 50%;">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <a href="#" class="btn btn-primary">View outfit</a>
              </div>
            </div>
          </div>
        `;
        postCardsHtml += postCardHtml;
      });
      document.getElementById("my-posts").innerHTML = postCardsHtml;
      }).catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    } else {
      console.log("No user signed in.");
    }
  });
  
  