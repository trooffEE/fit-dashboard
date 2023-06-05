import axios from 'axios'
import { backendApiString } from '~/utils/constants'

export type DashboardResponse = {
  type: 'sleep' | 'calories',
  data: {
    actual: number,
    actualAvg: number,
    date: string,
    plan: number,
    planAvg: number,
  }[]
}

export const fetchDashboard = () => {
  return axios<DashboardResponse[]>({
    method: 'get',
    url: backendApiString('/public/dashboard'),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  })
}
