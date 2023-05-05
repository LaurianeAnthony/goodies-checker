import { request } from "./request"
import { BILLETWEB_EVENT_ID } from "../constants"
import { Barcode } from "../types"
import { BilletwebUser } from "../types/billetweb"

type GetBilletwebUser = (barcode: Barcode) => Promise<BilletwebUser[]>

export const getBilletwebUser: GetBilletwebUser = async (barcode) =>
  await request<BilletwebUser[]>(
    `https://www.billetweb.fr/api/event/${BILLETWEB_EVENT_ID}/attendees?barcode=${barcode}&user=16254&key=1679091c5a880faf6fb5e6087eb1b2dc&version=1`, {
      method: "GET",
    })

