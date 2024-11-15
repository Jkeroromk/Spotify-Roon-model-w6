// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC4p9L4deS3LtzUI55jYhy0Ut4mB5LeXJE",
  authDomain: "spotify-roon-project.firebaseapp.com",
  projectId: "spotify-roon-project",
  storageBucket: "spotify-roon-project.firebasestorage.app",
  messagingSenderId: "204115231448",
  appId: "1:204115231448:web:0034e23043b5b9f1b24dad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
