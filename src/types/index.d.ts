
export type Device = "mobile" | "desktop"

export type Barcode = string | null


export type Attendee = {
  id: string,
  fullname: string,
  barcode: string,
  goodies: string,
  tshirtSize: string
}