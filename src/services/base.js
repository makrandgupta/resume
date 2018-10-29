import firebase from 'firebase';
import Rebase from 're-base';
import * as firebaseConfig from './firebase-config.json';

firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebase.database());

export default base;