

import { useQuery } from "react-query"
import { getBilletwebAttendees } from "../services/getBilletwebAttendees"
import { User } from "../types";
import { BilletwebApiError, BilletwebUser } from "../types/billetweb";
import { formatBilletwebAttendeeToUser } from "../utils/formatBillewebAttendeeToUser";

const useAttendees = (): User[] => {
  const lsAttendees = localStorage.getItem("attendees")

  const attendees = lsAttendees ? JSON.parse(lsAttendees) : []
  
  const {data} = useQuery<BilletwebUser[], BilletwebApiError>(
    ["BILLET_WEB_USER_ID"],
    () => getBilletwebAttendees(),
    {enabled: Boolean(!lsAttendees || lsAttendees.length === 0)}
  )

  const users = data ? data.map(user => formatBilletwebAttendeeToUser(user)) : null
  if(!lsAttendees) {
    localStorage.setItem("attendees", JSON.stringify(users))
  }

  return lsAttendees ? attendees : users
}

export default useAttendees
