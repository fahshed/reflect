import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";

const journalCollection = collection(db, "journalEntries");

export async function createJournalEntry(
  content: string,
  tags: string[],
  userId: string
) {
  try {
    const newEntry = {
      content,
      tags,
      userId,
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(journalCollection, newEntry);
    return { id: docRef.id, ...newEntry };
  } catch (error) {
    console.error("Error creating journal entry:", error);
    throw error;
  }
}

export async function getJournalEntries(userId: string) {
  try {
    const userQuery = query(journalCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(userQuery);

    const entries = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return entries;
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    throw error;
  }
}

export async function updateJournalEntry(
  id: string,
  updatedContent: string,
  updatedTags: string[]
) {
  try {
    const entryDoc = doc(db, "journalEntries", id);
    await updateDoc(entryDoc, {
      content: updatedContent,
      tags: updatedTags,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating journal entry:", error);
    throw error;
  }
}

export async function deleteJournalEntry(id: string) {
  try {
    const entryDoc = doc(db, "journalEntries", id);
    await deleteDoc(entryDoc);
  } catch (error) {
    console.error("Error deleting journal entry:", error);
    throw error;
  }
}
