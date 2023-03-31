var ImageFile;

function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob; // Display this image
    })
}
listenFileSelect();

function savePost() {
    //alert("SAVE POST is triggered");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            var desc = document.getElementById("description").value;
            db.collection("posts").add({
                owner: user.uid,
                description: desc,
                last_updated: firebase.firestore.FieldValue
                    .serverTimestamp() //current system time
            }).then(doc => {
                console.log("Post document added!");
                console.log(doc.id);
                uploadPic(doc.id);
                alert("Submission Posted!");
            })
        } else {
            // No user is signed in.
            console.log("Error, no user signed in");
        }
    });
}


function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID);
    console.log(ImageFile);

    storageRef.put(ImageFile)
        .then(function () {
            console.log('Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()
                .then(function (url) { // Get URL of the uploaded file
                    console.log("Got the download URL.");
                    db.collection("posts").doc(postDocID).update({
                        "image": url // Save the URL into users collection
                    })
                        .then(function () {
                            console.log('Added pic URL to Firestore.');
                            const user = firebase.auth().currentUser;
                            saveNewPostID(user.uid, postDocID);
                            savePostIDforUser(postDocID);
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}

function saveNewPostID(userUID, postDocID){
    db.collection("users")
             .doc(userUID)
             .update({
                 posts: firebase.firestore.FieldValue.arrayUnion(postDocID)
             })
             .then(() =>
                 console.log("Saved to user's document!"))
             .catch((error) => {
                 console.error("Error writing document: ", error);
             });
}

//--------------------------------------------
//saves the post ID for the user, in an array
//--------------------------------------------
function savePostIDforUser(postDocID) {
    firebase.auth().onAuthStateChanged(user => {
          console.log("user id is: " + user.uid);
          console.log("postdoc id is: " + postDocID);
          db.collection("users").doc(user.uid).update({
                myposts: firebase.firestore.FieldValue.arrayUnion(postDocID)
          })
          .then(() =>{
                console.log("5. Saved to user's document!");
                                alert ("Post is complete!");
                window.location.href = "showposts.html";
           })
           .catch((error) => {
                console.error("Error writing document: ", error);
           });
    })
}