import { collection, query, where, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase-config'

export const getListPerson = async () => {
    try {

        const list = []

        const q = query(collection(db, "Users"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            list.push({ ...doc.data(), id: doc.id })
        });
        return list
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

export const createPerson = async (person) => {

    try {
        const docRef = await addDoc(collection(db, "Users"), person);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export const updatePerson = async (person, id) => {
    try {

        const docRef = doc(db, "Users", id);

        await updateDoc(docRef, person);
        console.log("Document updated with ID: ", id);

    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export const deletePerson = async (id) => {
    try {

        const docRef = doc(db, "Users", id);

        await deleteDoc(docRef);
        console.log("Document deleted with ID: ", id);

    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}