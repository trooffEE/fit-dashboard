import React from 'react'
import Link from 'next/link'

const NavigationBar = () => {
  return (
    <aside className="bg-primaryDark px-3 py-4 flex flex-col">
      <Link className="p-5 -mx-3 font-semibold text-lg" href="/">Fit-App</Link>
      <Link className="p-5 -mx-3 font-semibold text-lg" href="/calories">Calories</Link>
      <Link className="p-5 -mx-3 font-semibold text-lg" href="/sleep">Sleep</Link>
      <Link className="p-5 -mx-3 font-semibold text-lg" href="/exercise">Exercise</Link>
    </aside>
  )
}

export default NavigationBar
