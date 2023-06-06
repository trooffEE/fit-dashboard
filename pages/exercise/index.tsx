import Router from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ExerciseCard from '~/components/trainings/ExerciseCard'
import { AuthContext } from '~/contexts/auth'
import { useCodeCheck } from '~/hooks/fetch'
import { ExerciseResponse, fetchAllExercises } from '~/services/trainings'

type Props = {}

const Exercise = (props: Props) => {
  const [exercises, setExercises] = useState<ExerciseResponse[]>([])
  const { isLoggedIn, getUsername } = useContext(AuthContext)
  const { checkCode } = useCodeCheck()

  useEffect(() => {
    if (isLoggedIn) {
      fetchAllExercises(getUsername())
        .then(({ data }) => {
          setExercises(data)
        })
        .catch(checkCode)
    }
  }, [])

  const exerciseRedirect = (exercise: ExerciseResponse) => {
    Router.push({ pathname: `/exercise/${exercise.id}` })
  }

  const activeExercises = exercises.filter((exercise) => exercise.enabled)
  const inactiveExercises = exercises.filter((exercise) => !exercise.enabled)

  return (
    <div className="flex flex-col gap-10">
      {activeExercises.length !== 0 && (
        <div className="grid grid-cols-12 gap-8">
          <h1 className="col-span-full text-2xl">Активные на данный момент тренировки</h1>
          {activeExercises.map((exercise) => (
            <ExerciseCard data={exercise} onClick={() => exerciseRedirect(exercise)} />
          ))}
        </div>
      )}
      {inactiveExercises.length !== 0 && (
        <div className="grid grid-cols-12 gap-8">
          <h1 className="col-span-full text-2xl">Неактивные на данный момент тренировки</h1>
          {inactiveExercises.map((exercise) => (
            <ExerciseCard data={exercise} onClick={() => exerciseRedirect(exercise)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Exercise
