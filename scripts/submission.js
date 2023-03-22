var ImageFile;

        function listenFileSelect() {
            // listen for file selection
            var fileInput = document.getElementById("mypic-input"); // pointer #1
            const image = document.getElementById("mypic-goes-here"); // pointer #2

            fileInput.addEventListener('change', function (e) {
                ImageFile = e.target.files[0];
                var blob = URL.createObjectURL(ImageFile);
                image.src = blob; // display this image
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
                        saveNewPostID(user.uid, doc.id);
                        //uploadPic(doc.id);
                    })
                } else {
                    // No user is signed in.
                    console.log("Error: no user is logged in");
                }
            });
        }


        function uploadPic(postDocID) {
            console.log("inside uploadPic " + postDocID);
            var storageRef = storage.ref("images/" + postDocID + ".jpg");

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
                                })
                        })
                })
                .catch((error) => {
                    console.log("error uploading to cloud storage");
                })
        }

        function saveNewPostID(userUID, postDocID) {
            console.log("inside saveNewPostID");
            console.log(userUID);
            console.log(postDocID);
            // db.collection("users")
            // .doc(userUID)
            // .update({
            //     posts: firebase.firestore.FieldValue.arrayUnion(postDocID)
            // })
            // .then(() =>
            //     console.log("Saved to user's document!"))
            // .catch((error) => {
            //     console.error("Error writing document: ", error);
            // });

            db.collection("users").doc(userUID).set({
                    myposts: firebase.firestore.FieldValue.arrayUnion(postDocID)
                }, {
                    merge: true
                })
                .then(() =>
                    console.log("Saved to user's document!"))
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }


        function createFakePosts(sometopic) {
            alert("in createFakePosts");
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    // Do something for the user here. 
                    db.collection("posts").add({
                        owner: user.uid,
                        description: "This post is about ... " + sometopic,
                        last_updated: firebase.firestore.FieldValue
                            .serverTimestamp() //current system time
                    }).then(doc => {
                        console.log("Post document added!");
                        console.log(doc.id);
                        saveNewPostID(user.uid, doc.id);
                        //uploadPic(doc.id);
                    })
                } else {
                    // No user is signed in.
                    console.log("Error: no user is logged in");
                }
            });
        }

        function showMyPosts() {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    // Do something for the user here. 
                    db.collection("users").doc(user.uid).get()
                        .then(doc => {
                            console.log(doc.data().myposts);
                            myposts.forEach(item => {
                                console.log(item);
                            })
                        })
                } else {
                    // No user is signed in.
                    console.log("Error: no user is logged in");
                }
            });
        }
        showMyPosts();