import { UseQueryResult, useQuery } from "react-query"
import { getBilletwebAttendee } from "../services/getBilletwebAttendee"
import { Barcode, Attendee } from "../types"
import { BilletwebApiError, BilletwebAttendee } from "../types/billetweb"
import { formatBilletwebAttendeeToAttendee } from "../utils/formatBillewebAttendeeToUser"



export const useBilletwebAttendee: (_: {barcode?: Barcode, email?: string}) => Partial<UseQueryResult<BilletwebAttendee[], BilletwebApiError>> & {attendee: Attendee | null} = ({barcode, email}) => {
 
  const {data, ...other} = useQuery<BilletwebAttendee[], BilletwebApiError>(
    ["BILLET_WEB_USER_ID"],
    () => getBilletwebAttendee({barcode: barcode || "", email: email}),
    {enabled: Boolean(barcode || email)}
  )

  const attendee = data ? formatBilletwebAttendeeToAttendee(data[0]) : null

  return {
    attendee: attendee,
    ...other
  }
}

