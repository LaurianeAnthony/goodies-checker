
import { collection, getDocs, Firestore } from "firebase/firestore/lite";
import React, {
  createContext,
  FC,
  useState,
  PropsWithChildren,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react"
import { Barcode, User } from "./types"

type Step = "HOME" | "SCANNING" | "RESULT" | "SEARCH"
export interface AppContextType {
  firestoreDb: Firestore | null
  firestoreAttendees: User[]
  barcode: Barcode
  setBarcode: Dispatch<SetStateAction<Barcode>>
  step: Step
  setStep: Dispatch<SetStateAction<Step>>
}

export const INITIAL_APP_CONTEXT: AppContextType = {
  firestoreDb: null,
  firestoreAttendees: [],
  barcode: null,
  setBarcode: () => undefined,
  step: "HOME",
  setStep: () => undefined
}


export const AppContext = createContext<AppContextType>(INITIAL_APP_CONTEXT)
export const useAppContext = (): AppContextType => useContext(AppContext)

const AppProvider: FC<PropsWithChildren<{firestoreDb : Firestore}>> = ({
  children,
  firestoreDb
}) => {
  const [barcode, setBarcode] = useState<Barcode>(null)
  const [firebaseAttendees, setFirebaseAttendes] = useState<User[]>([])
  const [step, setStep] = useState<Step>("HOME")

  useEffect(() => {
    let attendees: User[] = []
    const attendeesCollection = collection(firestoreDb, "attendees");
    getDocs(attendeesCollection).then(collection => collection.docs.map(doc => attendees.push({id: doc.id, ...doc.data() }as User)));

    setFirebaseAttendes(attendees)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

 

  return (
    <AppContext.Provider
      value={{
        firestoreDb: firestoreDb,
        firestoreAttendees: firebaseAttendees,
        barcode,
        setBarcode,
        step,
        setStep
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppProvider
