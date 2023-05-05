import { UseQueryResult, useQuery } from "react-query"
import { getBilletwebUser } from "../services/getBilletwebUser"
import { Barcode, User } from "../types"
import { BilletwebApiError, BilletwebUser } from "../types/billetweb"



export const useBilletwebUser = (barcode?: Barcode): Partial<UseQueryResult<BilletwebUser[], BilletwebApiError>> & {user: User | null} => {
  const {data, ...other} = useQuery<BilletwebUser[], BilletwebApiError>(
    ["BILLET_WEB_USER_ID", barcode],
    () => getBilletwebUser(barcode || ""),
    {enabled: Boolean(barcode)}
  )

  const user = data ? {
    id: data[0].id,
    firstname: data[0].firstname,
    name: data[0].name,
    barcode: data[0].barcode,
    goodies: data[0].custom["Sac & goodies Sunny Tech"],
    tshirtSize: data[0].custom["Taille t-shirt"],
  } : null

  return {
    user: user,
    ...other
  }
}

