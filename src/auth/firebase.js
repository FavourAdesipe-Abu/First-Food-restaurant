import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqlXIK_tJeEwRyBaaGfc3B0Q6efgKAePo",
  authDomain: "myrestaurant-c6053.firebaseapp.com",
  projectId: "myrestaurant-c6053",
  storageBucket: "myrestaurant-c6053.appspot.com",
  messagingSenderId: "344744855885",
  appId: "1:344744855885:web:362eec7df5e26b9a088f04",
  measurementId: "G-QETQGJYBTG"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const signUp = async (name, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await updateProfile(user, { displayName: name });
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logOut = () => {
  signOut(auth);
};
export { auth, db, signIn, signUp, logOut };

// import { initializeApp } from "firebase/app";
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   signInWithEmailAndPassword,
//   signOut,
//   updateProfile,
//   updateProfiler,
// } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyBqlXIK_tJeEwRyBaaGfc3B0Q6efgKAePo",
//   authDomain: "myrestaurant-c6053.firebaseapp.com",
//   projectId: "myrestaurant-c6053",
//   storageBucket: "myrestaurant-c6053.appspot.com",
//   messagingSenderId: "344744855885",
//   appId: "1:344744855885:web:362eec7df5e26b9a088f04",
//   measurementId: "G-QETQGJYBTG",
// };
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// const signIn = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const signUp = async (name, email, password) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//     const user = result.user;
//     await updateProfile(user, { displayName: name });
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const logOut = () => {
//   signOut(auth);
// };
// export { auth, db, signIn, signUp, signOut };
