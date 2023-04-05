import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

let db = false;

export const getRdb = () => {
  if (!db) {
    const firebaseConfig = {
        apiKey: "AIzaSyBRKPbIlAH_zFIWqbdzgNFqUTHy8jWQ3g4",
        authDomain: "plantio-2f764.firebaseapp.com",
        projectId: "plantio-2f764",
        storageBucket: "plantio-2f764.appspot.com",
        messagingSenderId: "258345657202",
        appId: "1:258345657202:web:5d63a2824e7f7b7db5b3eb",
        measurementId: "G-T2VFDNSB0J",
      };

    const app = initializeApp(firebaseConfig);

    db = getDatabase(app);
  }

  return db;
};