import axios from 'axios'
import { backendApiString } from '~/utils/constants'

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
  exercises: {
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
    }
    name: string
    sets: number
    repeats: number
    time: string
    weight: number
    comment: string
  }[]
  name: string
  comment: string
  enabled: boolean
}

export const fetchAllExercises = (userName: string) => {
  return axios<ExerciseResponse[]>({
    method: 'get',
    url: backendApiString(`/public/trainings?username=${userName}`),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  })
    .then(res => res)
}

export const fetchExercise = (userName: string, exerciseId: number) => {
  return axios<ExerciseResponse>({
    method: 'get',
    url: backendApiString(`/public/trainings/${exerciseId}?username=${userName}`),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  }).then((res) => res)
}
