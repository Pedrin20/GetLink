import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyCfVUHZ2v29NprY06WnPbc_4SxaBdiAv7c',
    authDomain: 'getlink-fbe77.firebaseapp.com',
    projectId: 'getlink-fbe77',
    storageBucket: 'getlink-fbe77.firebasestorage.app',
    messageSenderId: '621223911069',
    appId: '1:621223911069:web:7fd5978d9c67f562747e74'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)