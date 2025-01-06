import { css } from '@emotion/react'

export const globalStyles = css`
  #root {
    width: 100vw;
    height: 100vh;
    @supports (height: 100dvh) {
      height: min(100vh, 100dvh);
    }
  }
  #modal {
    /* No styling for now */
  }
  #tooltip {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  div,
  span {
    font-family: 'Poppins', sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background-color: #ebebeb;
    height: 100vh;
    width: 100vw;
    @supports (height: 100dvh) {
      height: min(100vh, 100dvh);
    }
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  a:-webkit-any-link {
    text-decoration: none;
  }

  a {
    text-decoration: none !important;
  }
`
