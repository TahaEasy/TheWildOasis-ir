import styled, { css } from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect } from "react";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  ${({ isDarkMode }) =>
    isDarkMode &&
    css`
      background: linear-gradient(to top, var(--color-grey-100), transparent),
        url(/auth-bg.jpg);
    `}
  ${({ isDarkMode }) =>
    !isDarkMode &&
    css`
      position: relative;
      &::before {
        content: "";
        position: fixed;
        left: 0;
        right: 0;
        z-index: -1;

        display: block;
        /* background-image: url("https://i.stack.imgur.com/CjzQS.jpg"); */
        background-image: url(/auth-bg.jpg);
        background-size: cover;
        width: 100%;
        height: 100%;

        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
      }
    `}
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-color: var(--color-grey-50); */
`;

const StyledHeading = styled(Heading)`
  ${({ isDarkMode = false }) =>
    isDarkMode
      ? css`
          color: var(--color-grey-600);
        `
      : css`
          color: var(--color-grey-300);
        `}
`;

function Login() {
  const { isDarkMode } = useDarkMode();

  return (
    <LoginLayout isDarkMode={isDarkMode}>
      <Logo mode="dark" />
      <StyledHeading as="h4">ورود به حساب کاربری</StyledHeading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
