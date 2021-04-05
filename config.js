import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyD_lEfTxDnJ-8CMfqoZape769a5B-mMh4U",
  authDomain: "watch-zone-e5ad6.firebaseapp.com",
  projectId: "watch-zone-e5ad6",
  storageBucket: "watch-zone-e5ad6.appspot.com",
  messagingSenderId: "415604179301",
  appId: "1:415604179301:web:c7f3fa0e74dc170e35e18c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
