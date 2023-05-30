import { KioskoProvider } from '../context/kioskoProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <KioskoProvider>
      <Component {...pageProps} />
    </KioskoProvider>
  )
}

export default MyApp
