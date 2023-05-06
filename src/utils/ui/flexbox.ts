import React from "react"
import { css } from "styled-components"

export type FlexboxProps = {
  alignItems?: React.CSSProperties["alignItems"]
  alignContent?: React.CSSProperties["alignContent"]
  justifyItems?: React.CSSProperties["justifyItems"]
  justifyContent?: React.CSSProperties["justifyContent"]
  flexWrap?: React.CSSProperties["flexWrap"]
  flexDirection?: React.CSSProperties["flexDirection"]
  flex?: React.CSSProperties["flex"]
  flexGrow?: React.CSSProperties["flexGrow"]
  flexShrink?: React.CSSProperties["flexShrink"]
  flexBasis?: React.CSSProperties["flexBasis"]
}

export const flexbox = css`
  ${({
    alignItems,
    alignContent,
    justifyItems,
    justifyContent,
    flexWrap,
    flexDirection,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
  }: FlexboxProps) => `
    ${alignItems ? `align-items:${alignItems};` : ""}
    ${alignContent ? `align-content:${alignContent};` : ""}
    ${justifyItems ? `justify-items:${justifyItems};` : ""}
    ${justifyContent ? `justify-content:${justifyContent};` : ""}
    ${flexWrap ? `flex-wrap:${flexWrap};` : ""}
    ${flexDirection ? `flex-direction:${flexDirection};` : ""}
    ${flex ? `flex:${flex};` : ""}
    ${flexGrow ? `flex-grow:${flexGrow};` : ""}
    ${flexShrink ? `flex-shrink:${flexShrink};` : ""}
    ${flexBasis ? `flex-basis:${flexBasis};` : ""}
  `}
`
