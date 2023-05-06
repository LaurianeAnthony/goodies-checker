

import { useMutation } from "react-query"
import { useAppContext } from "../AppProvider";
import { getBilletwebAttendees } from "../services/getBilletwebAttendees"
import { BilletwebUser } from "../types/billetweb";
import { formatBilletwebAttendeeToUser } from "../utils/formatBillewebAttendeeToUser";

const useBilletwebAttendeesMutation = () => {
  const { setNotify } = useAppContext()

  const mutationOptions = {
    onSuccess: (data: BilletwebUser[]) => {
      const users = data.map(attendee => formatBilletwebAttendeeToUser(attendee))
      localStorage.setItem("attendees", JSON.stringify(users))
      
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
