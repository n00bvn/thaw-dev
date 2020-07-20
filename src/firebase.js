import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCrDe0nDRkTSTqyFJB-oTgzikSGbGU5Kno",
  authDomain: "thaw-dev-d10fc.firebaseapp.com",
  databaseURL: "https://thaw-dev-d10fc.firebaseio.com",
  projectId: "thaw-dev-d10fc",
  storageBucket: "thaw-dev-d10fc.appspot.com",
  messagingSenderId: "615370419708",
  appId: "1:615370419708:web:43646dd746a4f85eb35679",
  measurementId: "G-6ZFDB6EWV1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseDb = firebase.database();
export const firebaseAuth = firebase.auth();
