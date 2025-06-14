import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config"; // Firestore instance from your config

// export function writeData(key, data) {
//   const db = getDatabase();
//   const reference = ref(db, `${key}`);
//   push(reference, data);
// }

export function setupDataListener(
  collectionKey: string,
  updateFunc: (data: any[]) => void
) {
  console.log("setupDataListener called");
  const collectionRef = collection(db, collectionKey);

  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    if (!snapshot.empty) {
      const newArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });

  return unsubscribe;
}
