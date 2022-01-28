
//import * as firebase from 'firebase';
// import '@firebase/auth';
//import '@firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAWmESJ6UexVQU7CXnTWKlAfCqo9xkxI3w",
    authDomain: "black-box-app-9c466.firebaseapp.com",
    databaseURL: "https://black-box-app-9c466-default-rtdb.firebaseio.com",
    projectId: "black-box-app-9c466",
    storageBucket: "black-box-app-9c466.appspot.com",
    messagingSenderId: "148371021093",
    appId: "1:148371021093:web:053fa533a32c2423b38ecc",
    measurementId: "G-B9DPY665TK"
  };
  

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export { app };