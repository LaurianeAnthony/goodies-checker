import { Device } from "../types"

export const getUserDevice = (userAgent: string): Device => {
  if (userAgent.match(/Android/i)
  || userAgent.match(/webOS/i)
  || userAgent.match(/iPhone/i)
  || userAgent.match(/iPad/i)
  || userAgent.match(/iPod/i)
  || userAgent.match(/BlackBerry/i)
  || userAgent.match(/Windows Phone/i)) {
    return "mobile"
  } else {
    return "desktop"
  }
}