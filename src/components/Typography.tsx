import React, {  FC, PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { THEME } from "../constants/theme";
import { DisplayProps, display } from "../utils/ui/display";
import { MarginProps, margin } from "../utils/ui/margin";
import { PaddingProps, padding } from "../utils/ui/padding";

type TypographyVariant= "h2" | "h3" | "body" | "footnote"

type TypographyProps = {
  variant: TypographyVariant,
  textAlign?: React.CSSProperties["textAlign"],
  color?: string,
  backgroundColor?: string
} & MarginProps & PaddingProps & DisplayProps


type htmlTag = "h1" | "h2" | "h3" | "h4" | "span"
const variantMapping: Record<TypographyVariant, htmlTag> = {
  h2: "h2",
  h3: "h3",
  body: "span",
  footnote: "span",
}

const typographyVariantStyles = {
  h2: css`
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  `,
  h3: css`
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
  `,
  body: css`
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 24px;
  `,
  footnote: css`
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    line-height: 16px;
  `,
}

const StyledTypography = styled.div<TypographyProps>`
  color: ${({color}) => color ? color : THEME.colors.content.main};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;


  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}

  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}

  ${({ variant }) => typographyVariantStyles[variant]}

  ${margin}
  ${padding}
  ${display}
`



export const Typography: FC<PropsWithChildren<TypographyProps>> = ({variant, children, ...props}) => {

  return (
    <StyledTypography 
      variant={variant}      
      as={variantMapping[variant]}
      {...props}
    >
      {children}
    </StyledTypography>
  )
}