import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, LineChart, Area, ComposedChart } from 'recharts'
import GraphContainer from '~/components/GraphContainer'
import { getColors } from '~/utils/getColors'

const weekdays = dayjs.weekdaysShort(true).map((weekday) => {
  return weekday[0].toUpperCase() + weekday.slice(1)
})

/**
 * {
 *    name: 'sleep-graph',
 *    data: [
 *      {
 *        name: 'строка-дня-недели в формате ISO или обговорим'
 *        sleepNeeded: number,
 *        sleepActual: number
 *      }
 *    ]
 *
 * }
 */
const sleepData = weekdays.map((weekday) => {
  return {
    name: weekday,
    sleepNeeded: +(Math.random() * 10).toFixed(2),
    sleepActual: +(Math.random() * 10).toFixed(2),
  }
})
let caloriesData = weekdays.map((weekday) => {
  return {
    name: weekday,
    caloriesNeeded: +(Math.random() * 3500).toFixed(),
    caloriesActual: +(Math.random() * 2500).toFixed(),
  }
})

const averageCalories = +(
  caloriesData.reduce((acc, cur) => (acc += cur.caloriesActual), 0) / caloriesData.length
).toFixed()
const averageCaloriesNeeded = +(
  caloriesData.reduce((acc, cur) => (acc += cur.caloriesNeeded), 0) / caloriesData.length
).toFixed()
caloriesData = caloriesData.map((calory) => ({ ...calory, averageCalories, averageCaloriesNeeded }))

const c = getColors()

const SleepGraph = () => (
  <ResponsiveContainer width="100%" height={500}>
    <LineChart width={600} height={400} data={sleepData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke={c.whiteSecondary} strokeWidth={2} />
      <YAxis scale="auto" stroke={c.whiteSecondary} strokeWidth={2} />
      <Tooltip wrapperStyle={{ background: 'red' }} />
      <Line type="monotone" dataKey="sleepNeeded" stroke={'#F1D16F'} strokeWidth={3} fill={'#F1D16F'} />
      <Line type="monotone" dataKey="sleepActual" stroke={'#ADDACC'} strokeWidth={3} fill="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
)

const CaloriesConsumedGraph = () => {
  const caloriesNeededColor = '#47C6A0'
  const caloriesActualColor = '#F1D16F'
  const stopOpacityStart = 0.7
  const stopOpacityEnd = 0.2
  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart width={730} height={250} data={caloriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={caloriesNeededColor} stopOpacity={stopOpacityStart} />
            <stop offset="95%" stopColor={caloriesNeededColor} stopOpacity={stopOpacityEnd} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={caloriesActualColor} stopOpacity={stopOpacityStart} />
            <stop offset="95%" stopColor={caloriesActualColor} stopOpacity={stopOpacityEnd} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke={c.whiteSecondary} strokeWidth={2} />
        <YAxis scale="auto" stroke={c.whiteSecondary} strokeWidth={2} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="caloriesNeeded"
          stroke={caloriesNeededColor}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="caloriesActual"
          stroke={caloriesActualColor}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Line
          type="monotone"
          dataKey="averageCalories"
          stroke={caloriesActualColor}
          strokeWidth={3}
          fill={c.whiteSecondary}
        />
        <Line
          type="monotone"
          dataKey="averageCaloriesNeeded"
          stroke={caloriesNeededColor}
          strokeWidth={3}
          fill={c.whiteSecondary}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default function Home() {
  const [currentTimeString, setCurrentTimeString] = useState<string | null>(null)

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTimeString(dayjs().format('dddd LTS'))
    }, 1000)
    return () => clearInterval(timerId)
  }, [])

  return (
    <>
      <div className="py-4 text-center">
        <span className="font-bold">Дашборд 🤟</span> {currentTimeString && <span>Сейчас - {currentTimeString}</span>}
      </div>
      <main className="grid grid-cols-4 gap-6">
        <GraphContainer className="col-span-2">
          <SleepGraph />
          <div className="pt-4 text-center">Сон</div>
        </GraphContainer>
        <GraphContainer className="col-span-2">
          <CaloriesConsumedGraph />
          <div className="pt-4 text-center">Калории</div>
        </GraphContainer>
      </main>
    </>
  )
}
