import '@fontsource/inter';
import "./App.css"
import Navbar from './components/Navbar/Navbar';
import { createContext, useEffect, useState } from 'react';
import Quotes from './pages/Quotes/Quotes';
import LogIn from './pages/LogIn/LogIn';
import { CssVarsProvider, extendTheme } from '@mui/joy';

export const userContext = createContext()

export default function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  if (accessToken === "null") {
    setAccessToken("")
  }
  useEffect(() => {
    localStorage.setItem("token", accessToken)
  }, [accessToken])

  const val = { accessToken, setAccessToken };
  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          gradient: {
            primary: 'linear-gradient(to top, var(--joy-palette-primary-50), var(--joy-palette-primary-200))',
          },
        }
      }
    }
  })

  return (
    <userContext.Provider value={val}>
      <CssVarsProvider theme={theme}>
        <Navbar />
        <main>
          {val.accessToken ? <Quotes /> : <LogIn />}
        </main>
      </CssVarsProvider>
    </userContext.Provider>
  )
}
