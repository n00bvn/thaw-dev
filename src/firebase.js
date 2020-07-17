import * as firebase from 'firebase'

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
const fbdb = firebase.initializeApp(firebaseConfig);

export default fbdb.database();
