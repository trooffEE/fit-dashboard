import Image from 'next/image'
import { Inter } from 'next/font/google'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { getColors } from '~/utils/getColors'
const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 500, pv: 100, amt: 300 },
  { name: 'Page B', uv: 700, pv: 100, amt: 300 },
  { name: 'Page B', uv: 300, pv: 1000, amt: 300 },
  { name: 'Page B', uv: 250, pv: 100, amt: 300 },
]

const inter = Inter({ subsets: ['latin'] })
const c = getColors()

const RenderLineChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="uv" stroke={c.secondary} strokeWidth={3} />
      <Line type="monotone" dataKey="pv" stroke={c.white} strokeWidth={3} />
      <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
      <XAxis dataKey="name" stroke={c.whiteSecondary} strokeWidth={2} />
      <YAxis stroke={c.whiteSecondary} strokeWidth={2} />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
)

export default function Home() {
  return (
    <main className='grid grid-cols-4'>
      <div className="bg-primaryDark/30 col-span-2 pr-5">
        <RenderLineChart />
      </div>
    </main>
  )
}
