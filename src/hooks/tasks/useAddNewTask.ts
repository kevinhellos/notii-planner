import { auth, db } from "../../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore"; 

export async function useAddNewTask(
    name: string, 
    description: string, 
    category: string,
){
    const userUid = auth?.currentUser?.uid;

    if (!userUid) {
        throw new Error("User is not authenticated !");
    }

    const tasksCollectionRef = collection(db, `Accounts/${userUid}/Tasks`);
    const newTaskRef = doc(tasksCollectionRef);

    await setDoc(newTaskRef, {
        name: name, 
        description: description, 
        category: category,
    });

    // Return the ID of the newly created task
    return newTaskRef.id;
}