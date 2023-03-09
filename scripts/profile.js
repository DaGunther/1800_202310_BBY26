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