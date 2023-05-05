export type BilletwebUser = {
  id: string,
	barcode: string,
  custom: Record<string, string>
}

export type BilletwebApiError = {
  message: string
}