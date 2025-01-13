import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider,signInWithCredential} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJGONSlSSybeu8Ulj6xUA7sXUuc7utZos",
  authDomain: "resuable-784cc.firebaseapp.com",
  projectId: "resuable-784cc",
  storageBucket: "resuable-784cc.appspot.com",
  messagingSenderId: "685017526822",
  appId: "1:685017526822:android:8ba7ca50e775f1415eace7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const googleAuthProvider = GoogleAuthProvider;
export const signInWithFirebaseCredential = signInWithCredential;
export default app;
