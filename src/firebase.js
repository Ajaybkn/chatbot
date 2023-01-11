//firebase functions-->>

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyB9M6nyN-y47nkOBAp71QEubuJlQvtoaDI',
  authDomain: 'chatbot-cninjas.firebaseapp.com',
  projectId: 'chatbot-cninjas',
  storageBucket: 'chatbot-cninjas.appspot.com',
  messagingSenderId: '950669180170',
  appId: '1:950669180170:web:1871f28d61482a46de0ef3',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
