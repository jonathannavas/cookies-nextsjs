import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Layout } from '../components/layouts'
interface Props {
  theme: string
}
const ThemeChangerPage: FC<Props> = ({ theme }: Props) => {
  const [currentTheme, setCurrentTheme] = useState(theme)

  const handleChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTheme(e.target.value)
    window.localStorage.setItem('theme', e.target.value)
    Cookies.set('theme', e.target.value)
  }

  const onClick = async () => {
    const { data } = await axios.get('/api/hello')
    console.log({ data })
  }

  useEffect(() => {
    console.log('LS', window.localStorage.getItem('theme'))
    console.log('Cookies', Cookies.get('theme'))
  }, [])

  return (
    <Layout title="Changer Theme">
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup value={currentTheme} onChange={handleChangeTheme}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
              <Button onClick={onClick}>Solicitud</Button>
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { name = 'No name', theme = 'dark' } = req.cookies

  const validThemes = ['light', 'dark', 'custom']

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'dark',
      name,
    },
  }
}

export default ThemeChangerPage
