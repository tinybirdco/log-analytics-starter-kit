import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '@tremor/react/dist/esm/tremor.css'
import AnalyticsProvider from '../components/Provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnalyticsProvider>
      <Component {...pageProps} />
    </AnalyticsProvider>
  )
}
