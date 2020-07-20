import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

// Initialize Firebase
firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));

export const firebaseDb = firebase.database();
export const firebaseAuth = firebase.auth();
