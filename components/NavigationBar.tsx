import React from 'react'
import Link from 'next/link'

const NavigationBar = () => {
  return (
    <aside className="bg-primaryDark px-3 py-4 flex flex-col">
      <Link className="p-5 -mx-3 font-semibold text-lg hover:bg-secondary/40 transition-colors" href="/">Fit-App</Link>
      <Link className="p-5 -mx-3 font-semibold text-lg hover:bg-secondary/40 transition-colors" href="/calories">Калории</Link>
      <Link className="p-5 -mx-3 font-semibold text-lg hover:bg-secondary/40 transition-colors" href="/sleep">Сон</Link>
      <Link className="p-5 -mx-3 font-semibold text-lg hover:bg-secondary/40 transition-colors" href="/training">Тренировка</Link>
      <Link className="p-5 -mx-3 font-semibold text-lg hover:bg-secondary/40 transition-colors" href="/exercise">Упражнения</Link>
    </aside>
  )
}

export default NavigationBar
