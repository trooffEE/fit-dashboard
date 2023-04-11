import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import NavigationBar from '~/components/NavigationBar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="grid h-screen w-screen grid-cols-layout gap-4 bg-primary">
      <NavigationBar />
      <div className="col-span-full col-start-2 px-3 py-4">
        <Component {...pageProps} />
      </div>
    </div>
  )
}
