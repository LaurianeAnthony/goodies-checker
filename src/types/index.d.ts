
export type Device = "mobile" | "desktop"

export type Barcode = string | null


export type User = {
  id: string,
  firstname: string,
  name: string,
  barcode: string,
  goodies: string,
  tshirtSize: string
}