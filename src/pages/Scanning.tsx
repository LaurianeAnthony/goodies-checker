import React, { useState } from "react";
import { useAppContext } from "../AppProvider";
import { Alert } from "../components/Alert";
import { Camera } from "../components/Camera";
import { useBilletwebUser } from "../hooks/useBilletwebUser";

export const Scanning = () => {
  const [ error, setError ] = useState<string | null>(null)
  const {barcode} = useAppContext()

  const data = useBilletwebUser(barcode)
  console.log(data)
  
  
  return (
    <>
      {error && <Alert severity="error" text={error} />}
      <Camera onError={e => setError(e)} />
    </>
  );
}

