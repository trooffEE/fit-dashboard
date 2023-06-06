import _ from 'lodash'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import { Poppins, Roboto } from 'next/font/google'
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
import { AuthContext } from '~/contexts/auth'
import { currentUser, isLoggedIn as loginHelper } from '~/hooks/isLoggedIn'
import NoSSR from '~/components/NoSSR'
import LoginForm from '~/components/login/LoginForm'
import 'react-toastify/dist/ReactToastify.css'

dayjs.extend(weekday)
dayjs.extend(localizedFormat)
dayjs.locale(locale)
dayjs.extend(isoWeek)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)

const font = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  const [currentTimeString, setCurrentTimeString] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!loginHelper())
  const getUsername = currentUser
  const logOut = () => {
    localStorage.setItem('username', '')
    setIsLoggedIn(false)
  }

  const logIn = (value: string) => {
    localStorage.setItem('username', value)
    setIsLoggedIn(true)
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTimeString(dayjs().format('dddd LTS'))
    }, 1000)
    return () => clearInterval(timerId)
  }, [])
  const layoutFix = isLoggedIn ? 'col-start-2' : 'col-start-1'

  return (
    <NoSSR>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, getUsername }}>
        <div className="grid h-screen w-screen grid-cols-layout gap-4 bg-primary">
          {isLoggedIn && <NavigationBar />}
          <div className={`col-span-full px-3 py-4 ${font.className} ${layoutFix}`}>
            {isLoggedIn ? (
              <>
                <div className="flex w-full items-center justify-between">
                  {currentTimeString && (
                    <>
                      <span>{_.capitalize(currentTimeString)}</span>
                      <button
                        className="rounded-md border border-primaryDark bg-secondary/60 px-3 py-2"
                        onClick={logOut}
                      >
                        LogOut
                      </button>
                    </>
                  )}
                </div>
                <Component {...pageProps} />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <LoginForm loginCallback={logIn} />
              </div>
            )}
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="light"
        />
      </AuthContext.Provider>
    </NoSSR>
  )
}
