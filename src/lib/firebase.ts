import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "studio-7803273808-8f136",
  "appId": "1:630037700711:web:11f47759f981b65d38b4c2",
  "storageBucket": "studio-7803273808-8f136.firebasestorage.app",
  "apiKey": "AIzaSyD37zSo6BAOxOU4u8DG13HUQosY1iiTeM4",
  "authDomain": "studio-7803273808-8f136.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "630037700711"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
