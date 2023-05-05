import React, {
  createContext,
  FC,
  useState,
  PropsWithChildren,
  useContext,
  Dispatch,
  SetStateAction,
} from "react"
import { Barcode } from "./types"



export interface AppContextType {
  barcode: Barcode
  setBarcode: Dispatch<SetStateAction<Barcode>>
}

export const INITIAL_APP_CONTEXT: AppContextType = {
  barcode: null,
  setBarcode: () => undefined,
}


export const AppContext = createContext<AppContextType>(INITIAL_APP_CONTEXT)
export const useAppContext = (): AppContextType => useContext(AppContext)

const AppProvider: FC<PropsWithChildren> = ({
  children,
}) => {
 
  const [barcode, setBarcode] = useState<Barcode>(null)

 

  return (
    <AppContext.Provider
      value={{
        barcode,
        setBarcode
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppProvider
