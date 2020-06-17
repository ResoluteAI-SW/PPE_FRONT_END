import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCkhLfu310qqMkJNcGPkoUiAmq4CqWYSe4",
  authDomain: "fg003fe.firebaseapp.com",
  databaseURL: "https://fg003fe.firebaseio.com",
  storageBucket: "gs://fg003fe.appspot.com",
  projectId: "fg003fe",
  storageBucket: "fg003fe.appspot.com",
  messagingSenderId: "953604715108",
  appId: "1:953604715108:web:c5048db9682514e9bee571",
  measurementId: "G-XZ7ZXZ50WJ",
};

const Firebase = firebase.initializeApp(firebaseConfig);
export const db = Firebase.firestore();
export const rdb = Firebase.database();
export const storageRef = firebase.storage().ref();
export default Firebase;
