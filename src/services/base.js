import firebase from 'firebase';
import Rebase from 're-base';
import * as firebaseConfig from './firebase-config.json';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp }
export default base;