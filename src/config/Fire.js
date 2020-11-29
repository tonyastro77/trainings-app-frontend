import firebase from 'firebase';

var Config = {
        apiKey: "AIzaSyC0qpmpLRXxtdGBXxpHPuXXNi8dBwWT6qs",
    authDomain: "test-64738.firebaseapp.com",
    databaseURL: "https://test-64738.firebaseio.com",
    projectId: "test-64738",
    storageBucket: "test-64738.appspot.com",
    messagingSenderId: "215765870411",
    appId: "1:215765870411:web:9099a7e47f2b3aee"
};

const fire = firebase.initializeApp(Config);

export default fire;