// Import the functions you need from the SDKs you need
import { getApp } from "@react-native-firebase/app";
import { getApps } from "@react-native-firebase/app";
import { initializeApp } from "@react-native-firebase/app";
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
  measurementId: "G-7K88MCC4V2",
  databaseURL: "https://dummy.firebaseio.com"
};

// Initialize Firebase
let app; 
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized: ", app.name);
} else {
  app = getApp();
  console.log("Firebase app initialized: ", app.name);
 // if already initialized, use that one
}


export { app };
