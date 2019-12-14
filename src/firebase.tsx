import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCo0vjpSue2qYEO8rbALbADZFlm0YLRtcU",
    authDomain: "farmguide-demo.firebaseapp.com",
    databaseURL: "https://farmguide-demo.firebaseio.com",
    projectId: "farmguide-demo",
    storageBucket: "farmguide-demo.appspot.com",
    messagingSenderId: "763956172404",
    appId: "1:763956172404:web:5b790928c1bdc2080d6321",
    measurementId: "G-J2JF18FLQX"
};

firebase.initializeApp(config);

export default firebase;