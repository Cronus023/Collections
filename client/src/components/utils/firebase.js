import firebase from 'firebase/app'
import 'firebase/storage'
var firebaseConfig = {
    apiKey: "AIzaSyB2X9oiKyd6kQ2KcxLsEgp96rLZZfUcR8M",
    authDomain: "collection-fad38.firebaseapp.com",
    databaseURL: "https://collection-fad38.firebaseio.com",
    projectId: "collection-fad38",
    storageBucket: "collection-fad38.appspot.com",
    messagingSenderId: "473033717823",
    appId: "1:473033717823:web:62fba33517fb0205a6e08a",
    measurementId: "G-3XX6BRSLYH"
  };
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };