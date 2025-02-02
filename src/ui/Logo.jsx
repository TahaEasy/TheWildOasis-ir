import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo({ mode = "default" }) {
  const { isDarkMode } = useDarkMode();

  let src;

  if (mode === "default") {
    src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  }
  if (mode === "dark") {
    src = "/logo-dark.png";
  }
  if (mode === "light") {
    src = "/logo-light.png";
  }

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
