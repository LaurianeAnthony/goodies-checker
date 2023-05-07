import { Attendee } from "../types"
import { BilletwebAttendee } from "../types/billetweb"

export const formatBilletwebAttendeeToAttendee = (attendee: BilletwebAttendee): Attendee => {
  return {
    id: attendee.ext_id,
    fullname: attendee.firstname + " " + attendee.name,
    barcode: attendee.barcode,
    goodies: attendee.custom["Sac & goodies Sunny Tech"],
    tshirtSize: attendee.custom["Taille t-shirt"],
  }
}