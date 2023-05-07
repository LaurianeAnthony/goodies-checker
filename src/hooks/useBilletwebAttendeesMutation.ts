

import { useMutation } from "react-query"
import { useAppContext } from "../AppProvider";
import { getBilletwebAttendees } from "../services/getBilletwebAttendees"
import { BilletwebAttendee } from "../types/billetweb";
import { formatBilletwebAttendeeToAttendee } from "../utils/formatBillewebAttendeeToUser";
import { saveAttendeesToLocalStorage } from "../utils/saveAttendeesToLocalStorage";

const useBilletwebAttendeesMutation = () => {
  const { setNotify } = useAppContext()

  const mutationOptions = {
    onSuccess: (data: BilletwebAttendee[]) => {
      const users = data.map(attendee => formatBilletwebAttendeeToAttendee(attendee))
      saveAttendeesToLocalStorage(users)
      
      setNotify({text: "Liste synchronisée avec succès", severity: "success"})
    },
    onError: (error: string) => {
      setNotify({text: error, severity: "error"})
    },
  }
  const { mutateAsync: syncBilletwebAttendees, error } = useMutation(
    getBilletwebAttendees,
    mutationOptions
  )

  return { syncBilletwebAttendees, error }
}

export default useBilletwebAttendeesMutation
