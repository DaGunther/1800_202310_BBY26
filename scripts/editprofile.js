var currentUser;          //put this right after you start script tag before writing any functions.

var ImageFile;      //global variable to store the File Object reference


function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userGender = userDoc.data().gender;
                    var userEmail = userDoc.data().email;
                    var userPhone = userDoc.data().phone;
                    var userCity = userDoc.data().City;
                    var userCountry = userDoc.data().country;
                    var userHeight = userDoc.data().height;
                    var userAge = userDoc.data().age;
                    let picUrl = userDoc.data().profilePic;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userGender != null) {
                        document.getElementById("genderInput").value = userGender;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userPhone != null) {
                        document.getElementById("phoneInput").value = userPhone;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userCountry != null) {
                        document.getElementById("countryInput").value = userCountry;
                    }
                    if (userHeight != null) {
                        document.getElementById("heightInput").value = userHeight;
                    }
                    if (userAge != null) {
                        document.getElementById("ageInput").value = userAge;
                    }
                    if (picUrl != null){
                        console.log(picUrl);
                                        // use this line if "mypicdiv" is a "div"
                        //$("#mypicdiv").append("<img src='" + picUrl + "'>")
                        $("#mypic-goes-here").attr("src", picUrl);
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

// function editUserInfo() {
//     //Enable the form fields
//     document.getElementById('personalInfoFields').disabled = false;
// }

// editUserInfo();

onclick = "saveUserInfo()"   //event-listener that calls the function saveUserInfo after clicking on the button.

// function saveUserInfo() {

//     //enter code here
//     //a) get user entered values
//     userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
//     userGender = document.getElementById('genderInput').value;
//     userEmail = document.getElementById("emailInput").value;
//     userPhone = document.getElementById("phoneInput").value;
//     userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"
//     userCountry = document.getElementById("countryInput").value;
//     userHeight = document.getElementById("heightInput").value;
//     userAge = document.getElementById("ageInput").value;

//     //b) update user's document in Firestore
//     currentUser.update({
//         name: userName,
//         gender: userGender,
//         email: userEmail,
//         phone: userPhone,
//         City: userCity,
//         country: userCountry,
//         height: userHeight,
//         age: userAge
//     })
//         .then(() => {
//             console.log("Document successfully updated!");
//         })
//     //c) disable edit 
//     document.getElementById('personalInfoFields').disabled = true;
// }

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        console.log("Got the download URL.");
                        //get values from the from
                        userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
                        userGender = document.getElementById('genderInput').value;
                        userEmail = document.getElementById("emailInput").value;
                        userPhone = document.getElementById("phoneInput").value;
                        userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"
                        userCountry = document.getElementById("countryInput").value;
                        userHeight = document.getElementById("heightInput").value;
                        userAge = document.getElementById("ageInput").value;

                        //Asynch call to save the form fields into Firestore.
                        db.collection("users").doc(user.uid).update({
                            name: userName,
                            gender: userGender,
                            email: userEmail,
                            phone: userPhone,
                            City: userCity,
                            country: userCountry,
                            height: userHeight,
                            age: userAge,
                            profilePic: url // Save the URL into users collection
                        })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved use profile info');
                                document.getElementById('personalInfoFields').disabled = true;
                            })
                    })
            })
    })
}

