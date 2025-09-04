import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGADChoC7UosZNJLIC5Ki-pArg_W-Gwvw",
  authDomain: "tccc-bf93c.firebaseapp.com",
  projectId: "tccc-bf93c",
  storageBucket: "tccc-bf93c.firebasestorage.app",
  messagingSenderId: "522876930687",
  appId: "1:522876930687:web:f5522b5c9e01c3b0018d4a",
  measurementId: "G-7VBWDWBQL6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };