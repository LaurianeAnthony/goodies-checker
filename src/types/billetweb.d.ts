export type BilletwebAttendee = {
  ext_id: string,
  firstname: string,
  name: string,
	barcode: string,
  custom: {
    "Sac & goodies Sunny Tech": string,
    "Taille t-shirt": string
  }
}

export type BilletwebApiError = {
  message: string
}