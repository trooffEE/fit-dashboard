import Router from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ExerciseCard from '~/components/trainings/ExerciseCard'
import { AuthContext } from '~/contexts/auth'
import useFetch, { useCodeCheck } from '~/hooks/fetch'
import { ExerciseResponse, fetchAllExercises } from '~/services/trainings'

type Props = {}

const Exercise = (props: Props) => {
  const { getUsername } = useContext(AuthContext)
  const [data, isLoading] = useFetch(fetchAllExercises, [getUsername()], { options: { authOnly: true } })

  const exerciseRedirect = (exercise: ExerciseResponse) => {
    Router.push({ pathname: `/exercise/${exercise.id}` })
  }
  
  if (isLoading || !data) return 'Loading...'

  const activeExercises = data.filter((exercise) => exercise.enabled)
  const inactiveExercises = data.filter((exercise) => !exercise.enabled)


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
