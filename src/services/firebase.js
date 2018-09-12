import firebase from 'firebase';

const config = {
  apiKey: 'dummyApiKey',
  authDomain: 'dummy-domain.firebaseapp.com',
  databaseURL: 'https://dummy-domain.firebaseio.com',
  projectId: 'dummy-domain',
  storageBucket: 'dummy-domain.appspot.com',
  messagingSenderId: '99999999999'
};

firebase.initializeApp(config);
export default firebase;