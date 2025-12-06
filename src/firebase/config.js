// src/firebase/config.js
// Inicialização LAZY do Firebase — só carrega quando necessário

let _app = null;
let _db = null;

export async function getFirebaseDB() {
  if (_db) return _db;

  const [{ initializeApp }, { getFirestore }] = await Promise.all([
    import("firebase/app"),
    import("firebase/firestore")
  ]);

  const firebaseConfig = {
    apiKey: "AIzaSyCptB0SmTC_Cv4zVOHGGX3zzA01IyZM",
    authDomain: "pensologocreio-id-firebase.firebaseapp.com",
    projectId: "pensologocreio-id-firebase",
    storageBucket: "pensologocreio-id-firebase.firebasestorage.app",
    messagingSenderId: "482839755454",
    appId: "1:482839755454:web:f96ba289b3a29c6cbcef",
  };

  _app = initializeApp(firebaseConfig);
  _db = getFirestore(_app);

  return _db;
}
