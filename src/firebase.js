// src/firebase.js

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBPGG4kTNhEHclqq0NvweOsbU488RhTGio',
  authDomain: 'wisteria-in.firebaseapp.com',
  projectId: 'wisteria-in',
  storageBucket: 'wisteria-in.firebasestorage.app',
  messagingSenderId: '429991039753',
  appId: '1:429991039753:web:eedfc07cd0cdc0a24bb9d8',
  measurementId: 'G-7QKSDFWNH9'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Firebase Authentication
export const auth = getAuth(app)

// Google Authentication Provider
export const googleProvider = new GoogleAuthProvider()

// Always show Google account selection
googleProvider.setCustomParameters({
  prompt: 'select_account'
})