import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { firebaseConfig } from "./credentials";

export function initDB() {
  initializeApp(firebaseConfig);
}

export function writeData(key, data) {
  const db = getDatabase();
  const reference = ref(db, `${key}`);
  push(reference, data);
}

export function setupDataListener(key, updateFunc) {
  console.log("setDataListener called");
  const db = getDatabase();
  const reference = ref(db, `${key}`);
  onValue(reference, (snapshot) => {
    if (snapshot.val()) {
      const fbObject = snapshot.val();
      const newArr = [];
      Object.keys(fbObject).map((key, index) => {
        newArr.push({ ...fbObject[key], id: key });
      });
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });
}
