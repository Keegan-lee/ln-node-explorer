
import { PropsWithChildren } from 'react'
import { Container, Box } from '@chakra-ui/react'
import Head from 'next/head'

interface GlobalLayoutProps {
  title?: string;
}

export const GlobalLayout: React.FC<PropsWithChildren<GlobalLayoutProps>> = ({ children, title }) => {
  return (
    <Box p='2.5rem'>
      <Head>
        <title>{ (title || 'Amboss PubKey Explorer App') + ' | BitcoinKeegan'}</title>
        <meta property='og:type' content='website' />
        {/* <link rel='icon' href='/favicon/favicon.ico' /> */}
      </Head>
      <Box w='100%'>
        { children }
      </Box>
    </Box>
  )
  
}