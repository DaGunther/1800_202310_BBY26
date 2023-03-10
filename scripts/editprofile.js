var currentUser;          //put this right after you start script tag before writing any functions.

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
                            var userGender =userDoc.data().gender;
                            var userEmail = userDoc.data().email;
                            var userPhone = userDoc.data().phone;
                            var userCity = userDoc.data().City;
                            var userCountry = userDoc.data().country;
                            var userHeight = userDoc.data().height;
                            var userAge = userDoc.data().age;

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
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it 
populateUserInfo();

function editUserInfo() {
   //Enable the form fields
   document.getElementById('personalInfoFields').disabled = false;
}

editUserInfo();

onclick="saveUserInfo()"   //event-listener that calls the function saveUserInfo after clicking on the button.

function saveUserInfo() {
    //enter code here
    //a) get user entered values
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userGender = document.getElementById('genderInput').value;
    userEmail = document.getElementById("emailInput").value;
    userPhone = document.getElementById("phoneInput").value;
    userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"
    userCountry = document.getElementById("countryInput").value;
    userHeight = document.getElementById("heightInput").value;
    userAge = document.getElementById("ageInput").value;

    //b) update user's document in Firestore
    currentUser.update({
        name: userName,
        gender: userGender,
        email: userEmail,
        phone: userPhone,
        City: userCity,
        country: userCountry,
        height: userHeight,
        age: userAge
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}