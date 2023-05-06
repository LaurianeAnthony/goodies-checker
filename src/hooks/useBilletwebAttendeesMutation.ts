

import { doc, deleteDoc, setDoc } from "firebase/firestore/lite";
import { useMutation } from "react-query"
import { useAppContext } from "../AppProvider";
import { getBilletwebAttendees } from "../services/getBilletwebAttendees"
import { BilletwebUser } from "../types/billetweb";
import { formatBilletwebAttendeeToUser } from "../utils/formatBillewebAttendeeToUser";

const useBilletwebAttendeesMutation = () => {


  const {firestoreDb} = useAppContext()

  const mutationOptions = {

    onSuccess: (data: BilletwebUser[]) => {
      const users = data.map(attendee => formatBilletwebAttendeeToUser(attendee))

      if(firestoreDb){
        users.map(user => {
          deleteDoc(doc(firestoreDb, "attendees", user.id)).then(() => {
            setDoc(doc(firestoreDb, "attendees", user.id), {
              fullname: user.fullname,
              barcode: user.barcode + "1EZET",
              goodies: user.goodies,
              tshirtSize: user.tshirtSize,
            });
          })
        })
      }
    },
    onError: (error: string) => {
      console.log(error)
    },
  }
  const { mutateAsync: syncBilletwebAttendees, error } = useMutation(
    getBilletwebAttendees,
    mutationOptions
  )

  return { syncBilletwebAttendees, error }
}

export default useBilletwebAttendeesMutation
