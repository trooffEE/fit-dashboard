import axios from 'axios'
import { backendApiString } from '~/utils/constants'

export type DashboardResponse = {
  type: 'sleep' | 'calories'
  data: {
    actual: number
    actualAvg: number
    date: string
    plan: number
    planAvg: number
  }[]
}

export type DateTimePeriod = {
  start: string
  end: string
}
/**
 * @param userName 
 * @param period 2023-06-06
 * @returns 
 */
export const fetchDashboard = (userName: string, period: DateTimePeriod) => {
  return axios<DashboardResponse[]>({
    method: 'get',
    url: backendApiString(`/public/dashboard`),
    params: {
      username: userName,
      start: period.start,
      finish: period.end,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  })
}
