import { auth, db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function useUpdateTask(id: string, newCategory: string) {
    try {
        const taskDocRef = doc(db, `Accounts/${auth?.currentUser?.uid}/Tasks`, id);
        await updateDoc(taskDocRef, {
            category: newCategory
        });
        // console.log(`Task with id ${id} updated successfully.`);
    } catch (err) {
        console.error(`Error updating task with id ${id}: ${err}`);
    }
}