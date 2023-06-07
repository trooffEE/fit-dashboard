import Router from 'next/router'
import React, { useContext, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '~/contexts/auth'

const LoginForm = ({ loginCallback }: { loginCallback: (value: string) => void }) => {
  const inputRef = useRef<any>(null)
  const [val, setVal] = useState('')
  const { setIsLoggedIn } = useContext(AuthContext)

  const handleLogin = (e: any) => {
    e.preventDefault()
    const value = inputRef.current ? inputRef.current.value : ''
    if (value.length > 4) {
      const { pathname } = Router
      if (pathname !== '/') {
        Router.push('/')
      }
      loginCallback(value)
    }
  }

  const changeItem = (e: any) => {
    if (inputRef.current.value.length === 1 && inputRef.current.value[0] !== '@') {
      inputRef.current.value = `@${inputRef.current.value}`
    }
  }

  return (
    <div className="flex min-w-[400px] max-w-5xl flex-col gap-6 rounded-lg bg-secondary px-14 py-12 text-center shadow-md">
      <div className="text-lg">Вход в Fit Application</div>
      <input
        onChange={changeItem}
        ref={inputRef}
        type="text"
        id="first_name"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Введите ID Telegram"
        required
      />
      <button onClick={handleLogin} className="rounded-md border border-primaryDark bg-primary/60 py-1">
        Вход
      </button>
    </div>
  )
}

export default LoginForm
