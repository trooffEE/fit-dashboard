import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import dayjs from 'dayjs'
import * as locale from 'dayjs/locale/ru'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import type { AppProps } from 'next/app'
import NavigationBar from '~/components/NavigationBar'
import '~/styles/globals.css'

dayjs.extend(weekday)
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
  const [currentTimeString, setCurrentTimeString] = useState<string | null>(null)

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTimeString(dayjs().format('dddd LTS'))
    }, 1000)
    return () => clearInterval(timerId)
  }, [])

  return (
    <div className="grid h-screen w-screen grid-cols-layout gap-4 bg-primary">
      <NavigationBar />
      <div className={`col-span-full col-start-2 px-3 py-4 ${font.className}`}>
        {currentTimeString && <span>{_.capitalize(currentTimeString)}</span>}
        <Component {...pageProps} currentTimeString={currentTimeString} />
      </div>
    </div>
  )
}
