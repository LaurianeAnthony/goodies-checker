import { UseQueryResult, useQuery } from "react-query"
import { getBilletwebUser } from "../services/getBilletwebUser"
import { Barcode, User } from "../types"
import { BilletwebApiError, BilletwebUser } from "../types/billetweb"
import { formatBilletwebAttendeeToUser } from "../utils/formatBillewebAttendeeToUser"



export const useBilletwebUser: (_: {barcode?: Barcode, email?: string}) => Partial<UseQueryResult<BilletwebUser[], BilletwebApiError>> & {user: User | null} = ({barcode, email}) => {
 
  const {data, ...other} = useQuery<BilletwebUser[], BilletwebApiError>(
    ["BILLET_WEB_USER_ID"],
    () => getBilletwebUser({barcode: barcode || "", email: email}),
    {enabled: Boolean(barcode || email)}
  )

  const user = data ? formatBilletwebAttendeeToUser(data[0]) : null

  return {
    user: user,
    ...other
  }
}

