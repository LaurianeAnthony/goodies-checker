import { request } from "./request"
import { BILLETWEB_EVENT_ID } from "../constants"
import { Barcode } from "../types"
import { BilletwebUser } from "../types/billetweb"


type GetBilletwebUser = (barcode: Barcode) => Promise<BilletwebUser>


export const getBilletwebUser: GetBilletwebUser = async (barcode) =>{
  const response = await request<BilletwebUser>(
    `https://www.billetweb.fr/api/event/${BILLETWEB_EVENT_ID}/attendees?barcode=${barcode}`, {
      method: "GET",
      headers: {
        "Authorization": "Basic MTYyNTQ6MTY3OTA5MWM1YTg4MGZhZjZmYjVlNjA4N2ViMWIyZGM=",
      }
    })
  return response
}

