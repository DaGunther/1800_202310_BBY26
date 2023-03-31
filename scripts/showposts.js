//-------------------------------------------------
// this function shows finds out who is logged in,
// reads the "myposts" field (an array) for that user, 
// reads the details for each item in the array
// and displays a card for each item. 
//------------------------------------------------
function showMyPosts() {
    firebase.auth().onAuthStateChanged(user => {
        console.log("user is: " + user.uid);
        db.collection("users").doc(user.uid)
            .get()
            .then(doc => {
                const myposts = doc.data().myposts; //get array of my posts
                console.log(myposts);
                myposts.forEach(item => {
                    db.collection("posts")
                        .doc(item)
                        .get()
                        .then(doc => {
                            displayMyPostCard(doc);
                        })
                        .catch(error => {
                            console.log("Error reading post document: ", error);
                        });
                })
            })
            .catch(error => {
                console.log("Error reading user document: ", error);
            });
    })
}
showMyPosts();

//------------------------------------------------------------
// this function displays ONE card, with information
// from the post document extracted (name, description, image)
//------------------------------------------------------------
function displayMyPostCard(doc) {
          var desc = doc.data().description; //gets the length field
          var image = doc.data().image; //the field that contains the URL 

          //clone the new card
          let newcard = document.getElementById("postCardTemplate").content.cloneNode(true);
          //populate with , image
          newcard.querySelector('.card-image').src = image;
          newcard.querySelector('.card-description').innerHTML = desc;
          //append to the posts
          document.getElementById("myposts-go-here").append(newcard);
}