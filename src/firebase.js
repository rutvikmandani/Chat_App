import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyDTZtYZmqFpQ1OfLLOHhAzCvqDdcKoow",
  authDomain: "chat-app-79ab5.firebaseapp.com",
  projectId: "chat-app-79ab5",
  storageBucket: "chat-app-79ab5.appspot.com",
  messagingSenderId: "738093937086",
  appId: "1:738093937086:web:967f9e7b6dfaa664b209ef",
  measurementId: "G-QX8G9C3QL7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
