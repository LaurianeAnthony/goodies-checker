import React, {  FC, PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { COLORS } from "../constants";

type TypographyVariant= "h2" | "body" | "footnote"

type htmlTag = "h1" | "h2" | "h3" | "h4" | "span"
const variantMapping: Record<TypographyVariant, htmlTag> = {
  h2: "h2",
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
  color: ${COLORS.content.default};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;



  ${({ textAlign }) => `text-align: ${textAlign};`}
  
  ${({ variant }) => typographyVariantStyles[variant]}

`

type TypographyProps = {variant: TypographyVariant, textAlign?: React.CSSProperties["textAlign"]}


export const Typography: FC<PropsWithChildren<TypographyProps>> = ({variant, textAlign, children}) => {

  return (
    <StyledTypography 
      variant={variant}      
      textAlign={textAlign}
      as={variantMapping[variant]}
    >
      {children}
    </StyledTypography>
  )
}