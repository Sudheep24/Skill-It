// firebaseConfig.js

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgq4SskmQElLpZbffEfahr7_meuLwEoYw",
  authDomain: "skill-it-33ebb.firebaseapp.com",
  projectId: "skill-it-33ebb",
  storageBucket: "skill-it-33ebb.appspot.com",
  messagingSenderId: "1050592758957",
  appId: "1:1050592758957:web:ea89e434ef286f93734a24",
  measurementId: "G-K2RMZWE854"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth and Firestore
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, db };
