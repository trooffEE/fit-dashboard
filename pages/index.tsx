import dayjs from 'dayjs'
import _ from 'lodash'
import { useEffect, useState, useContext } from 'react'
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  Area,
  ComposedChart,
} from 'recharts'
import GraphContainer from '~/components/GraphContainer'
import LoaderContent from '~/components/LoaderContent'
import NoSSR from '~/components/NoSSR'
import { AuthContext } from '~/contexts/auth'
import { DashboardResponse, fetchDashboard } from '~/services/dashboard'
import { getColors } from '~/utils/getColors'

const dataConverter = (data: DashboardResponse['data']) => {
  const dataSorted = _.sortBy(data, (dataItem) => {
    return dayjs(dataItem.date).unix()
  }).map((item) => ({
    name: dayjs(item.date).format('ddd'),
    needed: item.plan,
    actual: item.actual,
    avgPlan: item.planAvg,
    avgActual: item.actualAvg,
  }))
  return dataSorted
}

const c = getColors()

const SleepGraph: React.FC<{ data: DashboardResponse['data'] }> = ({ data }) => {
  const dataInner = dataConverter(data)
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart width={600} height={400} data={dataInner}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke={c.whiteSecondary} strokeWidth={2} />
        <YAxis scale="auto" stroke={c.whiteSecondary} strokeWidth={2} />
        <Tooltip wrapperStyle={{ background: 'red' }} />
        <Line type="monotone" dataKey="needed" stroke={'#F1D16F'} strokeWidth={3} fill={'#F1D16F'} />
        <Line type="monotone" dataKey="actual" stroke={'#ADDACC'} strokeWidth={3} fill="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

const CaloriesConsumedGraph: React.FC<{ data: DashboardResponse['data'] }> = ({ data }) => {
  const caloriesNeededColor = '#47C6A0'
  const caloriesActualColor = '#F1D16F'
  const stopOpacityStart = 0.7
  const stopOpacityEnd = 0.2
  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart
        width={730}
        height={250}
        data={dataConverter(data)}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
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
          dataKey="avgActual"
          stroke={caloriesActualColor}
          strokeWidth={3}
          fill={c.whiteSecondary}
        />
        <Line type="monotone" dataKey="avgPlan" stroke={caloriesNeededColor} strokeWidth={3} fill={c.whiteSecondary} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default function Home() {
  const [dataSleep, setDataSleep] = useState<DashboardResponse['data'] | null>(null)
  const [dataCalories, setDataCalories] = useState<DashboardResponse['data'] | null>(null)
  const { getUsername } = useContext(AuthContext)

  useEffect(() => {
    fetchDashboard(getUsername())
      .then(({ data }) => {
        data.forEach((item) => {
          switch (item.type) {
            case 'sleep':
              setDataSleep(item.data)
              break
            case 'calories':
              setDataCalories(item.data)
              break
            default:
              break
          }
        })
      })
      .catch(() => console.log(e))
  }, [])

  if (!dataSleep) return null

  const content = (
    <main className="grid grid-cols-4 gap-6">
      {dataSleep && (
        <GraphContainer className="col-span-2">
          <SleepGraph data={dataSleep} />
          <div className="pt-4 text-center">
            <button>Прошлая неделя</button>
            <div>Сон</div>
            <button>Следующая неделя</button>
          </div>
        </GraphContainer>
      )}
      {dataCalories && (
        <GraphContainer className="col-span-2">
          <CaloriesConsumedGraph data={dataCalories} />
          <div className="pt-4 text-center">Калории</div>
        </GraphContainer>
      )}
    </main>
  )

  return (
    <NoSSR>
      <div className="mb-10 py-4 text-center">
        <span className="text-xl font-bold">Дашборд 🤟</span>
      </div>
      <LoaderContent isLoading={isLoading} content={content} />
    </NoSSR>
  )
}
