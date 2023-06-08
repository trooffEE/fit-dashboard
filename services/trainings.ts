import axios from 'axios'
import { backendApiString } from '~/utils/constants'

export type ExerciseTraining = {
  id: number
  createdDate: string
  updatedDate: string
  deletedDate: null | string
  user: {
    id: number
    createdDate: string
    updatedDate: string
    deletedDate: null
    name: `@${string}`
  } | null
  name: string
  sets: number
  repeats: number
  time: string
  weight: number
  comment: string
}

export type ExerciseResponse = {
  id: number
  createdDate: string
  updatedDate: string
  deletedDate: null | string
  user: {
    id: number
    createdDate: string
    updatedDate: string
    deletedDate: null | string
    name: `@${string}`
  }
  exercises: ExerciseTraining[]
  name: string
  comment: string
  enabled: boolean
}

export const fetchAllTrainings = (userName: string) => {
  return axios<ExerciseResponse[]>({
    method: 'get',
    url: backendApiString(`/public/trainings?username=${userName}`),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  })
}

export const fetchTraining = (userName: string, exerciseId: number) => {
  return axios<ExerciseResponse>({
    method: 'get',
    url: backendApiString(`/public/trainings/${exerciseId}?username=${userName}`),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  })
}

export const fetchAllExercises = (userName: string) => {
  return axios<ExerciseTraining[]>({
    method: 'get',
    url: backendApiString(`/public/trainings/exercises`),
    params: {
      username: userName,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  })
}