import React from "react"
import { css } from "styled-components"

export type PositionProps = {
  position?: React.CSSProperties["position"]
  top?: string
  bottom?: string
  left?: string
  right?: string
}

export const position = css`
  ${({ position, top, bottom, left, right }: PositionProps) => `
    ${position ? `position:${position};` : ""}
    ${top ? `top:${top};` : ""}
    ${bottom ? `bottom:${bottom};` : ""}
    ${left ? `left:${left};` : ""}
    ${right ? `right:${right};` : ""}
  `}
`
