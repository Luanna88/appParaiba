import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
    apiKey: "AIzaSyDl6DY6-7kovW_MNxwM0J8Dm3rtiQQzrIE",
    authDomain: "appparaibe-se.firebaseapp.com",
    projectId: "appparaibe-se",
    storageBucket: "appparaibe-se.appspot.com",
    messagingSenderId: "150689283014",
    appId: "1:150689283014:web:5a568f2f8673fb37a110c7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
export default app;
