import Router from 'next/router'
import React, { useContext } from 'react'
import LoaderContent from '~/components/LoaderContent'
import TrainingCard from '~/components/trainings/TrainingCard'
import { AuthContext } from '~/contexts/auth'
import useFetch from '~/hooks/fetch'
import { ExerciseResponse, fetchAllTrainings } from '~/services/trainings'

type Props = {}

const Exercise = (props: Props) => {
  const { getUsername } = useContext(AuthContext)
  const [data, isLoading] = useFetch(fetchAllTrainings, [getUsername()], { options: { authOnly: true } })

  const exerciseRedirect = (exercise: ExerciseResponse) => {
    Router.push({ pathname: `/training/${exercise.id}` })
  }

  const activeExercises = data && data.filter((exercise) => exercise.enabled)
  const inactiveExercises = data && data.filter((exercise) => !exercise.enabled)

  const Content = data && (
    <div className="flex flex-col gap-10">
      {activeExercises.length !== 0 && (
        <div className="grid grid-cols-12 gap-8">
          <h1 className="col-span-full mt-4 text-2xl">Активные на данный момент тренировки</h1>
          {activeExercises.map((exercise) => (
            <TrainingCard data={exercise} onClick={() => exerciseRedirect(exercise)} />
          ))}
        </div>
      )}
      {inactiveExercises.length !== 0 && (
        <div className="grid grid-cols-12 gap-8">
          <h1 className="col-span-full mt-4 text-2xl">Активные на данный момент тренировки</h1>
          {inactiveExercises.map((exercise) => (
            <TrainingCard data={exercise} onClick={() => exerciseRedirect(exercise)} />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <LoaderContent isLoading={isLoading} content={Content} />
  )
}

export default Exercise
