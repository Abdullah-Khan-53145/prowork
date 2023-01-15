// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAorxhq591KP0sQBRI9NZIzHPbdWSszvA",
  authDomain: "prowork-c3c08.firebaseapp.com",
  projectId: "prowork-c3c08",
  storageBucket: "prowork-c3c08.appspot.com",
  messagingSenderId: "54225278591",
  appId: "1:54225278591:web:ff31cb79e4585e0e12914a",
  measurementId: "G-2YQ99XSYD2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
