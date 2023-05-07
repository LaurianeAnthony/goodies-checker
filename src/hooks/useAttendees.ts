

import { useQuery } from "react-query"
import { getBilletwebAttendees } from "../services/getBilletwebAttendees"
import { Attendee } from "../types";
import { BilletwebApiError, BilletwebAttendee } from "../types/billetweb";
import { formatBilletwebAttendeeToAttendee } from "../utils/formatBillewebAttendeeToUser";
import { saveAttendeesToLocalStorage } from "../utils/saveAttendeesToLocalStorage";

const useAttendees = (): Attendee[] => {
  const lsAttendees = localStorage.getItem("attendees")

  const attendees = lsAttendees ? JSON.parse(lsAttendees) : []
  
  const {data} = useQuery<BilletwebAttendee[], BilletwebApiError>(
    ["BILLET_WEB_USER_ID"],
    () => getBilletwebAttendees(),
    {enabled: Boolean(!lsAttendees || lsAttendees.length === 0)}
  )

  const users = data ? data.map(user => formatBilletwebAttendeeToAttendee(user)) : null
  if(!lsAttendees && users) {
    saveAttendeesToLocalStorage(users)
  }

  return lsAttendees ? attendees : users
}

export default useAttendees
