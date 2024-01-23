
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUIXIdJng4T1DAA1xqehaIZQqpdYsM1a8",
  authDomain: "socialweb-df2c8.firebaseapp.com",
  projectId: "socialweb-df2c8",
  storageBucket: "socialweb-df2c8.appspot.com",
  messagingSenderId: "1039923327845",
  appId: "1:1039923327845:web:7bf0dad839475929ff278c",
  measurementId: "G-97V61EGDXQ"
};

const app = initializeApp(firebaseConfig);

export const storage=getStorage(app)
export const auth=getAuth(app)
export const db = getFirestore(app);
