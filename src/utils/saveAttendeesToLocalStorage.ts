import { Attendee } from "../types";


export const saveAttendeesToLocalStorage = (attendees: Attendee[]): void => {
  const sortedAttendees = attendees.sort((a, b) => a.fullname.localeCompare(b.fullname))

  localStorage.setItem("attendees", JSON.stringify(sortedAttendees))
}