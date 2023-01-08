import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCnA3JRXqmnS79imz_4Qco8jklhwX74oO4",
	authDomain: "signal-9c29d.firebaseapp.com",
	projectId: "signal-9c29d",
	storageBucket: "signal-9c29d.appspot.com",
	messagingSenderId: "93249102423",
	appId: "1:93249102423:web:303674910169a3b6347912",
	measurementId: "G-ZNS3PS5J6N",
};

let firebaseApp;

if (firebase.apps.length === 0) {
	firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
	firebaseApp = firebase.app();
}

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
