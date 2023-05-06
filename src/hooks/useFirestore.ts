import { DocumentData } from "@firebase/firestore"
import { CollectionReference, collection } from "firebase/firestore/lite"
import { useAppContext } from "../AppProvider"


export const useFirestore: () => {attendeesCollection: CollectionReference<DocumentData> | null, attendeesGoodiesCheckerCollection: CollectionReference<DocumentData> | null} = () => {
  const { firestoreDb } = useAppContext()
  if(
    firestoreDb
  ){ 
    const attendeesCollection = collection(firestoreDb, "attendees");
    const attendeesGoodiesCheckerCollection = collection(firestoreDb, "attendees-goodies-checker");

    return {
      attendeesCollection,
      attendeesGoodiesCheckerCollection
    }
  }
  return {attendeesCollection: null, attendeesGoodiesCheckerCollection: null}
}

