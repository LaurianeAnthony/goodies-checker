import React from "react"
import { css } from "styled-components"

export type DisplayProps = {
  display?: React.CSSProperties["display"]
}

export const display = css`
  ${({ display }: DisplayProps) => `
    ${display ? `display:${display};` : ""}
  `}
`
