import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config";
import { getJournalEntries } from "./journal";

export function setupDataListener(
  collectionKey: string,
  userId: string,
  updateFunc: (data: any[]) => void
) {
  console.log("setupDataListener called");
  const collectionRef = collection(db, collectionKey);

  const unsubscribe = onSnapshot(collectionRef, async (snapshot) => {
    if (!snapshot.empty) {
      const newArr = await getJournalEntries(userId);
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });

  return unsubscribe;
}
