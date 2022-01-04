import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyASCR4iaLmcpivvSD3WgJFBr1fboxEnaD8",
    authDomain: "severless-316420.firebaseapp.com",
    projectId: "severless-316420",
    storageBucket: "severless-316420.appspot.com",
    messagingSenderId: "217561529830",
    appId: "1:217561529830:web:0f88390e43e906ab38aa27"
};

firebase.initializeApp(firebaseConfig);

export default firebase;