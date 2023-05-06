
import { Firestore } from "firebase/firestore/lite";
import React, {
  createContext,
  FC,
  useState,
  PropsWithChildren,
  useContext,
  Dispatch,
  SetStateAction,
} from "react"
import { Alert, Severity } from "./components/Alert";
import { Barcode } from "./types"

type Notify = {
  text: string,
  severity: Severity,
}
export interface AppContextType {
  firestoreDb: Firestore | null
  barcode: Barcode
  setBarcode: Dispatch<SetStateAction<Barcode>>
  notify: Notify | null
  setNotify: Dispatch<SetStateAction<Notify | null>>

}

export const INITIAL_APP_CONTEXT: AppContextType = {
  firestoreDb: null,
  barcode: null,
  setBarcode: () => undefined,
  notify: null,
  setNotify: () => undefined
}


export const AppContext = createContext<AppContextType>(INITIAL_APP_CONTEXT)
export const useAppContext = (): AppContextType => useContext(AppContext)

const AppProvider: FC<PropsWithChildren<{firestoreDb : Firestore}>> = ({
  children,
  firestoreDb
}) => {
  const [barcode, setBarcode] = useState<Barcode>(null)
  const [notify, setNotify] = useState<Notify | null>(null)

  return (
    <AppContext.Provider
      value={{
        firestoreDb: firestoreDb,
        barcode,
        setBarcode,
        notify,
        setNotify
      }}
    >
      {notify && <Alert text={notify.text} severity={notify.severity} onClose={() => setNotify(null)}/>}
      {children}
    </AppContext.Provider>
  )
}
export default AppProvider
