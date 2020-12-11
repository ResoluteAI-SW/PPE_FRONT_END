import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {

    apiKey: "AIzaSyB4Dt0gScVWpU4ln4pcbcZvpc07ei2yf2o",
    authDomain: "facegenie-superuser.firebaseapp.com",
    databaseURL: "https://facegenie-superuser.firebaseio.com",
    projectId: "facegenie-superuser",
    storageBucket: "facegenie-superuser.appspot.com",
    messagingSenderId: "93709248310",
    appId: "1:93709248310:web:f6dd4fdb5883c82b4c3597",
    measurementId: "G-WZ4VPMFGWS"

};

// Initialize Firebase
export var Firebase = firebase.initializeApp(firebaseConfig);

export var firerdb = firebase.database()

export var firedb = firebase.firestore()

export var storageRef = firebase.storage().ref();

