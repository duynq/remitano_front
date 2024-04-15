// ** Next Imports
import '@/assets/styles/global.css'
import Head from 'next/head'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import DefaultLayout from '@/components/layouts/default_layout'
import { RecoilRoot } from 'recoil'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, pageProps } = props

  // Variables
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <RecoilRoot>
      <Head>
        <title>{``}</title>
        <meta name="description" content={``} />
        <meta name="keywords" content={`themeConfig.templateName`} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
      </Head>

      {getLayout(<Component {...pageProps} />)}
    </RecoilRoot>
  )
}

export default App
