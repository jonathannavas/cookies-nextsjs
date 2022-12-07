import Head from 'next/head'
import { FC } from 'react'
import { Navbar } from '../ui'
interface Props {
  title?: string
  children?: React.ReactNode
}
export const Layout: FC<Props> = ({ children, title = 'Cookie Page' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main style={{ padding: '20px 50px' }}>{children}</main>
    </>
  )
}
