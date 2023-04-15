import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import NavigationBar from '~/components/NavigationBar'
import { Poppins } from 'next/font/google'
import dayjs from 'dayjs'
import * as locale from 'dayjs/locale/ru'
import isoWeek from 'dayjs/plugin/isoWeek'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)
dayjs.locale(locale)
dayjs.extend(isoWeek)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)

const font = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="grid h-screen w-screen grid-cols-layout gap-4 bg-primary">
      <NavigationBar />
      <div className={`col-span-full col-start-2 px-3 py-4 ${font.className}`}>
        <Component {...pageProps} />
      </div>
    </div>
  )
}
