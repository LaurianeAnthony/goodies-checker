import { request } from "./request"
import { BILLETWEB_EVENT_ID } from "../constants"
import { BilletwebAttendee } from "../types/billetweb"

type GetBilletwebAttendees = () => Promise<BilletwebAttendee[]>

export const getBilletwebAttendees: GetBilletwebAttendees = async () => await request<BilletwebAttendee[]>(
  `https://www.billetweb.fr/api/event/${BILLETWEB_EVENT_ID}/attendees?user=16254&key=1679091c5a880faf6fb5e6087eb1b2dc&version=1`, {
    method: "GET",
  })

