import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
//importing bootstrap css that was installed later by npm
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import * as firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDiFQBm3sBWpwbpmD9BrTDzVoDmRYS-b1c",
    authDomain: "reactnoteapp.firebaseapp.com",
    databaseURL: "https://reactnoteapp.firebaseio.com",
    projectId: "reactnoteapp",
    storageBucket: "reactnoteapp.appspot.com",
    messagingSenderId: "236325749356"
  };

firebase.initializeApp(config).database().ref();

ReactDOM.render(<App  />, document.getElementById('root'));


registerServiceWorker();
