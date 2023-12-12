// Api/Firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDs8cw6WPg6RP4sy8m-ds5x-FON2s3ydOs",
  authDomain: "codyukdb.firebaseapp.com",
  projectId: "codyukdb",
  storageBucket: "codyukdb.appspot.com",
  messagingSenderId: "634112968962",
  appId: "1:634112968962:web:fda27e93cd9c744a589a1b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
