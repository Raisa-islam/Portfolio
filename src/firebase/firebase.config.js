import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXlg7pzM2-mJBhUN3BKj4YvfdTFKCeHE8",
  authDomain: "portfolio-d608b.firebaseapp.com",
  projectId: "portfolio-d608b",
  storageBucket: "portfolio-d608b.appspot.com",
  messagingSenderId: "273732942124",
  appId: "1:273732942124:web:b5f12254b872934da01489"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
