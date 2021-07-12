import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`

* {
    margin:0;
    padding: 0;
    box-sizing: border-box;
}


body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:sans-serif;
    background-color: #D9E6F6;
  }

  #_next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display:block;
    border-radius: 10px;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}