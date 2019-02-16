import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAesqJlzx1SlRY35VDgUkkL6APQKnSg3fE",
    authDomain: "coin-toss-63026.firebaseapp.com",
    databaseURL: "https://coin-toss-63026.firebaseio.com",
    projectId: "coin-toss-63026",
    storageBucket: "coin-toss-63026.appspot.com",
    messagingSenderId: "309186469900"
  };
  firebase.initializeApp(config);
  
  export default firebase