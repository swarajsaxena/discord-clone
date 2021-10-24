import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAtSbL40N-tos9SaX-tKw3d2DoJ0-SMu8A",
  authDomain: "discord-clone-e82ca.firebaseapp.com",
  projectId: "discord-clone-e82ca",
  storageBucket: "discord-clone-e82ca.appspot.com",
  messagingSenderId: "833387764517",
  appId: "1:833387764517:web:4d60b7d21c430b903f58cc",
  measurementId: "G-PED0M3D64Y",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
