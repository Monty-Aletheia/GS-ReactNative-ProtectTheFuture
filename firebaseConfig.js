// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0q7MVitty3HTClUBn6fawtZMbAgWS_L4",
  authDomain: "gs-techcare.firebaseapp.com",
  projectId: "gs-techcare",
  storageBucket: "gs-techcare.firebasestorage.app",
  messagingSenderId: "402372132570",
  appId: "1:402372132570:web:03f06f5f04fab8496defe3",
  measurementId: "G-7K88MCC4V2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);