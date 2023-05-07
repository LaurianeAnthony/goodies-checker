import { request } from "./request"
import { BILLETWEB_EVENT_ID } from "../constants"
import { Barcode } from "../types"
import { BilletwebAttendee } from "../types/billetweb"

type GetBilletwebAttendee = (_: {barcode?: Barcode, email?: string }) => Promise<BilletwebAttendee[]>

export const getBilletwebAttendee: GetBilletwebAttendee = async ({barcode, email}) => {
  let params: string[] = []

  if(barcode){
    params.push(`barcode=${barcode}`)
  }

  if(email){
    params.push(`email=${email}`)
  }
  
  return  await request<BilletwebAttendee[]>(
    `https://www.billetweb.fr/api/event/${BILLETWEB_EVENT_ID}/attendees?${params.join("&")}&user=16254&key=1679091c5a880faf6fb5e6087eb1b2dc&version=1`, {
      method: "GET",
    })

}

