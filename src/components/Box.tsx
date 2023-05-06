import React, {
  FC, PropsWithChildren
} from "react"
import styled from "styled-components"
import {THEME } from "../constants/theme"
import { BorderRadius } from "../types/style"
import { DisplayProps, display } from "../utils/ui/display"
import { FlexboxProps, flexbox } from "../utils/ui/flexbox"
import { MarginProps, margin } from "../utils/ui/margin"



export type BoxProps = {
  className?: string
  withBorder?: boolean
  borderRadius?: BorderRadius
  colorSet?: "main" | "contrast" | "primary" | "secondary" | "error" | "success"
  component?: "div" | "button"
  width?: React.CSSProperties["width"]
  height?: React.CSSProperties["height"]
} & FlexboxProps & DisplayProps & MarginProps

const StyledBox = styled.div<
  BoxProps & {isButton?: boolean}
>`
  ${({ withBorder, colorSet }) =>
    withBorder &&
    `
		border: 1px solid ${THEME.colors.border[colorSet || "main"]};
	`}

  ${({ borderRadius }) =>
    borderRadius &&
    `
  	border-radius: ${borderRadius}px;
	`}

	box-sizing: border-box;

  ${({ colorSet }) =>
    colorSet &&
    `
		background-color: ${THEME.colors.background[colorSet]};
	`}

  ${({width}) => width && `width:${width};`}}
  ${({height}) => height && `height:${height};`}}

  ${({isButton}) => isButton && `
    &:hover {
      cursor: pointer;
    }
  `}

  ${flexbox}
  ${display}
  ${margin}
`

export const Box: FC<PropsWithChildren<BoxProps>> = ({
  children,
  className,
  component = "div",
  ...props
}) => {


  return (
    <StyledBox
      className={className}
      {...props}
      isButton={component === "button"}
      as={component}
    >
      {children}
    </StyledBox>
  )
}