import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBLsoq7MLCOJEbqfPJpzZmvf4LzHgDraWM",
  authDomain: "paw-mart-4995d.firebaseapp.com",
  projectId: "paw-mart-4995d",
  storageBucket: "paw-mart-4995d.firebasestorage.app",
  messagingSenderId: "170199557938",
  appId: "1:170199557938:web:4d4ef4d83159656426192b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;