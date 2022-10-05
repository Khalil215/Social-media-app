import { initializeApp } from "firebase/app";
import { getFirestore, collection,doc, getDocs, updateDoc, onSnapshot, addDoc, query,where, serverTimestamp, FieldValue, arrayUnion, arrayRemove, orderBy, limit } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyCA1_N20berJTeRM9g8clSRZAM8QpSMHHo",
  authDomain: "instagram-ikh.firebaseapp.com",
  projectId: "instagram-ikh",
  storageBucket: "instagram-ikh.appspot.com",
  messagingSenderId: "387233482587",
  appId: "1:387233482587:web:5f63c38fc9823299527c7e"
};


const firebase = initializeApp(config);

//initialize firebase
const db = getFirestore()
const userColRef = collection(db, 'users')
const photoColRef = collection(db, 'photos')
const messageRef = collection(db, 'messages')

//initialize authentication
const auth = getAuth()

//Set up database
// seedDatabase(addDoc, userColRef, photoColRef, serverTimestamp)






export { onSnapshot, db,doc,updateDoc, query,where,userColRef, getDocs, addDoc, photoColRef, messageRef, firebase, FieldValue, serverTimestamp, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, arrayUnion, arrayRemove, orderBy, limit };
