import { auth, db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore"; 

export async function useDeleteTask(id: string){
    try{
        const taskDocRef = doc(db, `Accounts/${auth?.currentUser?.uid}/Tasks`, id);
        await deleteDoc(taskDocRef);
    }
    catch(err){
        console.error(err);
    }
}