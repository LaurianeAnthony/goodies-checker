import { UseQueryResult, useQuery } from "react-query"
import { getBilletwebUser } from "../services/getBilletwebUser"
import { Barcode } from "../types"
import { BilletwebApiError, BilletwebUser } from "../types/billetweb"



export const useBilletwebUser = (barcode?: Barcode): UseQueryResult<BilletwebUser, BilletwebApiError> => {
  return useQuery<BilletwebUser, BilletwebApiError>(
    ["BILLET_WEB_USER_ID", barcode],
    () => getBilletwebUser(barcode || ""),
    {enabled: Boolean(barcode)}
  )
}

