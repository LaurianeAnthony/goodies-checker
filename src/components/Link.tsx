import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { THEME } from "../constants/theme";



export const Link = styled(RouterLink)`
  color: ${THEME.colors.content.main}
`
