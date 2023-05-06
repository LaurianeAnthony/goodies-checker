import { UseQueryResult, useQuery } from "react-query"
import { getBilletwebAttendees } from "../services/getBilletwebAttendees"
import { BilletwebApiError, BilletwebUser } from "../types/billetweb"



export const useBilletwebAttendees: () => Partial<UseQueryResult<BilletwebUser[], BilletwebApiError>> = () => {
 
  const {data, ...other} = useQuery<BilletwebUser[], BilletwebApiError>(
    ["GET_BILLET_WEB_ATTENDEES"],
    () => getBilletwebAttendees(),
  )

  console.log(data)

  return {
    ...other
  }
}

