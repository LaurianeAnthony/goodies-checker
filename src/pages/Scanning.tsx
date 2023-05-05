import React, { useState } from "react";
import { Alert } from "../components/Alert";
import { Camera } from "../components/Camera";

export const Scanning = () => {
  const [ error, setError ] = useState<string | null>(null)

  return (
    <>
      {error && <Alert severity="error" text={error} />}
      <Camera onError={e => setError(e)} />
    </>
  );
}

