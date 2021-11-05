import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import firebase from "firebase/compat";
import 'firebase/firestore';
import 'firebase/auth';

export const Context = createContext(null)

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAEEMSrCy3-hTwgiYRtIfZzRbEVVYKzrQ4",
    authDomain: "shop-project-331208.firebaseapp.com",
    projectId: "shop-project-331208",
    storageBucket: "shop-project-331208.appspot.com",
    messagingSenderId: "748784857883",
    appId: "1:748784857883:web:6bf3531d5a428d3c2d59be",
    measurementId: "G-BQTB31DGF6"
}
);

const  auth = firebase.auth()
const  firestore = firebase.firestore()
ReactDOM.render(
    <Context.Provider value={{
        userApp: new UserStore(),
        device: new DeviceStore(),
        firebase,
        auth,
        firestore,
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

