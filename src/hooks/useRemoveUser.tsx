import { deleteDoc, collection, doc } from "firebase/firestore";
import { database } from "../services/firestoreService";

const removeUser = async (documentID: string) => {
  try {
    if (documentID) {
      const collectionRef = collection(database, "test_users1");
      const documentRef = doc(collectionRef, documentID);
      await deleteDoc(documentRef);
    }
  } catch (error) {
    console.error("Error deleting documents:", error);
    throw error;
  }
};

export default removeUser;