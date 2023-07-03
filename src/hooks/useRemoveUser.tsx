import { deleteDoc, collection, query, where, getDocs} from "firebase/firestore";
import { database } from "../services/firestoreService";

const useRemoveUser = async (email:string) => {     
    try {
        if(email){
            const collectionRef = collection(database, "test_users1");
            const q= query(collectionRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async user => {
                await deleteDoc(user.ref)

            })
        }
    }catch(error){
        console.error("Error deleting documents:", error);
        throw error;
    }
}

export default useRemoveUser;