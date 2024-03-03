import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, signInWithRedirect, inMemoryPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcEP37JXCWvIu_9yH3FNvgDR27UdTGmrw",
  authDomain: "academicsync1.firebaseapp.com",
  projectId: "academicsync1",
  storageBucket: "academicsync1.appspot.com",
  messagingSenderId: "960179984658",
  appId: "1:960179984658:web:9a70aa356309cfa8c1fbcb",
  measurementId: "G-LFL5GXBKBY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
  
provider.setCustomParameters({   
    prompt : "select_account ",
    hd: "somaiya.edu"
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);