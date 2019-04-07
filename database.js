import Firebase from 'firebase';
  let config = {
    apiKey: "AIzaSyAN6w86PUUTFtCTXiBcgSKpRVyh6MXHG54",
    authDomain: "notekong-b8293.firebaseapp.com",
    databaseURL: "https://notekong-b8293.firebaseio.com",
    projectId: "notekong-b8293",
    storageBucket: "notekong-b8293.appspot.com",
    messagingSenderId: "945498599244"
  };
let app = Firebase.initializeApp(config);
export const db = app.database();