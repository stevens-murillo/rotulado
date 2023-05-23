

//import { initializeApp } from 'firebase/app';
import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getDatabase,set,ref  } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';


// Add Firebase products that you want to use
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc 
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
//============================================

const app = initializeApp({
  apiKey: "AIzaSyAhL1tYlZTFV_3iW2IBA0-52036HuWVOpc",
  authDomain: "wr-rotulado.firebaseapp.com",
  projectId: "wr-rotulado",
  storageBucket: "wr-rotulado.appspot.com",
  messagingSenderId: "719236286506",
  appId: "1:719236286506:web:2423a38cc317b0dc09db53"
});

const db = getDatabase(app);


// writeUserData('12', 'Hlene', 'esteven@gmail.com', "C:/xampp/htdocs/rotulado/js/firebase.js") ;

// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, 'rotulado/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }
db ? (console.log('configuracion firebase completa..')):(console.log('Error firebase'));

//Ingresa registros a DB 
export function ingresarUsuarios(UUID, formEnvio, formNom, formCel, formDir, formBar, formCiu) {

  set(ref(db, 'rotulado/' + UUID), {
    formEnvio: formEnvio,
    formNom: formNom,
    formCel : formCel,
    formDir : formDir,
    formBar : formBar,
    formCiu : formCiu
  })
  .then(() => {
    // Data saved successfully!
    alert('Registro exitoso');
  })
  .catch((error) => {
    // The write failed...
    alert('Error...');
  });;
}