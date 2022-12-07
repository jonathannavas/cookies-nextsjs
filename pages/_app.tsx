import { CssBaseline, ThemeProvider } from '@mui/material'
import Cookies from 'js-cookie'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import { customTheme, darkTheme, lightTheme } from '../themes'

interface Props extends AppProps {
  theme: string
}

function App({ Component, pageProps, theme = 'dark' }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light'
    const selectedTheme =
      cookieTheme === 'light'
        ? lightTheme
        : cookieTheme === 'dark'
        ? darkTheme
        : customTheme
    setCurrentTheme(selectedTheme)
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// App.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = appContext.ctx.req
//     ? (appContext.ctx.req as any).cookies
//     : { theme: 'light' }

//   const validThemes = ['light', 'dark', 'custom']
//   return {
//     theme: validThemes.includes(theme) ? theme : 'dark',
//   }
// }

export default App
