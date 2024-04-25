import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCofnpVXr30EqsN9YDcF8mhYzrd2KKdXpc",
    authDomain: "advcrud-eedff.firebaseapp.com",
    projectId: "advcrud-eedff",
    storageBucket: "advcrud-eedff.appspot.com",
    messagingSenderId: "871276924076",
    appId: "1:871276924076:web:1c86f0b07f5a21020f2309"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db
}