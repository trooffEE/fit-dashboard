import React, { useContext, useState, useEffect } from 'react'
import LoaderContent from '~/components/LoaderContent'
import ExerciseForm from '~/components/forms/ExerciseForm'
import { AuthContext } from '~/contexts/auth'
import useFetch from '~/hooks/fetch'
import { ExerciseTraining, fetchAllExercises } from '~/services/trainings'

type Props = {
  exercise: ExerciseTraining
}

const ExercisePage = (props: Props) => {
  const { getUsername } = useContext(AuthContext)
  const [data, isLoading] = useFetch(fetchAllExercises, [getUsername()], { options: { authOnly: true } })
  const [exercises, setExercises] = useState<typeof data>([])
  const [currentlyAddingExercise, setCurrentlyAddingExercise] = useState<null | {}>(null)

  useEffect(() => {
    if (data) setExercises(exercises)
  }, [data])

  let Content: JSX.Element = <></>

  if (data && exercises.length) {
    Content = (
      <div className="grid grid-cols-12">
        <div className="col-span-full mb-8 mt-4 flex items-center justify-between">
          <h1 className="text-2xl">Упражнения</h1>
          <button
            onClick={() => setCurrentlyAddingExercise({})}
            type="button"
            className="text-md mb-2 mr-2 rounded-lg bg-blue-500 px-5 py-2.5 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Добавить упражнение +
          </button>
        </div>
        <div className="purple-500/50 col-span-12 grid grid-cols-12 gap-8">
          {currentlyAddingExercise && (
            <ExerciseForm exercise={currentlyAddingExercise} onSave={() => {}} isHiddenWithCurtain />
          )}
          {exercises.map((exercise) => (
            <ExerciseForm exercise={exercise} onSave={() => {}} isHiddenWithCurtain />
          ))}
        </div>
      </div>
    )
  }

  return <LoaderContent isLoading={isLoading} content={Content} />
}

export default ExercisePage
