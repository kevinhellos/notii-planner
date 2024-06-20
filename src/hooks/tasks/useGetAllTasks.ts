import { CollectionReference, DocumentData, QuerySnapshot, Unsubscribe, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export interface TaskProps {
    id: string;
    name: string;
    description: string;
    category: string;
}

export default async function useGetAllTasks(): Promise<TaskProps[]> {
    return new Promise<TaskProps[]>((resolve, reject) => {
        const unsubscribe: Unsubscribe = auth.onAuthStateChanged(async (user) => {
            unsubscribe(); 

            if (user && user.providerData.some(provider => provider.providerId === "google.com")) {
                const userUid = user.uid;

                try {
                    const tasksCollection: CollectionReference<DocumentData> = collection(db, `Accounts/${userUid}/Tasks`);
                    const dataQuery: QuerySnapshot<DocumentData> = await getDocs(tasksCollection);
                    
                    const tasks: TaskProps[] = dataQuery.docs.map(doc => ({
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        category: doc.data().category,
                    }));

                    resolve(tasks);
                } catch (error) {
                    reject(`Error fetching tasks: ${error}`);
                }
            } else {
                reject("Error: user is not authenticated !");
            }
        });
    });
}