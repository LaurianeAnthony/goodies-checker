import { User } from "../types"
import { BilletwebUser } from "../types/billetweb"

export const formatBilletwebAttendeeToUser = (attendee: BilletwebUser): User => {
  return {
    id: attendee.ext_id,
    fullname: attendee.firstname + " " + attendee.name,
    barcode: attendee.barcode,
    goodies: attendee.custom["Sac & goodies Sunny Tech"],
    tshirtSize: attendee.custom["Taille t-shirt"],
  }
}