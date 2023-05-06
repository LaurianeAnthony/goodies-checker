import { css } from "styled-components"
import { getFormattedSpaceValue } from "./margin"

type SpaceValues = "xs" | "s" | "m" | "l" | "xl"

export type PaddingProps = {
  p?: SpaceValues
  pt?: SpaceValues
  pb?: SpaceValues
  pl?: SpaceValues
  pr?: SpaceValues
  px?: SpaceValues
  py?: SpaceValues
}

export const padding = css`
  ${({ p, pt, pb, pl, pr, px, py }: PaddingProps) => `
		${p ? `padding:${getFormattedSpaceValue(p)};` : ""}
		${pt ? `padding-top:${getFormattedSpaceValue(pt)};` : ""}
		${pb ? `padding-bottom:${getFormattedSpaceValue(pb)};` : ""}
		${pl ? `padding-left:${getFormattedSpaceValue(pl)};` : ""}
		${pr ? `padding-right:${getFormattedSpaceValue(pr)};` : ""}
    
		${
  px
    ? `
			padding-right:${getFormattedSpaceValue(px)};
			padding-left:${getFormattedSpaceValue(px)} ;
		`
    : ""
}
		${
  py
    ? `
			padding-top:${getFormattedSpaceValue(py)};
			padding-bottom:${getFormattedSpaceValue(py)} ;
		`
    : ""
}
	`}
`
