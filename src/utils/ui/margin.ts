import { css } from "styled-components"
import { THEME } from "../../constants/theme"

type SpaceValues = "xs" | "s" | "m" | "l" | "xl"


export const getFormattedSpaceValue = (value: SpaceValues): string => `${THEME.spacing[value]}px`


export type MarginProps = {
  m?: SpaceValues
  mt?: SpaceValues
  mb?: SpaceValues
  ml?: SpaceValues
  mr?: SpaceValues
  mx?: SpaceValues
  my?: SpaceValues
}

export const margin = css`
  ${({ m, mt, mb, ml, mr, mx, my }: MarginProps) => `
		${m ? `margin:${getFormattedSpaceValue(m)};` : ""}
		${mt ? `margin-top:${getFormattedSpaceValue(mt)};` : ""}
		${mb ? `margin-bottom:${getFormattedSpaceValue(mb)};` : ""}
		${ml ? `margin-left:${getFormattedSpaceValue(ml)};` : ""}
		${mr ? `margin-right:${getFormattedSpaceValue(mr)};` : ""}
    
		${
  mx
    ? `
			margin-right:${getFormattedSpaceValue(mx)};
			margin-left:${getFormattedSpaceValue(mx)} ;
		`
    : ""
}
		${
  my
    ? `
			margin-top:${getFormattedSpaceValue(my)};
			margin-bottom:${getFormattedSpaceValue(my)} ;
		`
    : ""
}
	`}
`
