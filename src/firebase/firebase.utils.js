import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAwDgDjo9s2DOY6RDlSBw5j9thrwUDswYI",
  authDomain: "crwn-db-7ebbf.firebaseapp.com",
  databaseURL: "https://crwn-db-7ebbf.firebaseio.com",
  projectId: "crwn-db-7ebbf",
  storageBucket: "crwn-db-7ebbf.appspot.com",
  messagingSenderId: "981460751319",
  appId: "1:981460751319:web:89613293014d32c8923192",
  measurementId: "G-801HYDZFTT"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
