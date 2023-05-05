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

type Step = "HOME" | "SCANNING" | "RESULT"
export interface AppContextType {
  barcode: Barcode
  setBarcode: Dispatch<SetStateAction<Barcode>>
  step: Step
  setStep: Dispatch<SetStateAction<Step>>
}

export const INITIAL_APP_CONTEXT: AppContextType = {
  barcode: null,
  setBarcode: () => undefined,
  step: "HOME",
  setStep: () => undefined
}


export const AppContext = createContext<AppContextType>(INITIAL_APP_CONTEXT)
export const useAppContext = (): AppContextType => useContext(AppContext)

const AppProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [barcode, setBarcode] = useState<Barcode>(null)
  const [step, setStep] = useState<Step>("HOME")

 

  return (
    <AppContext.Provider
      value={{
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
