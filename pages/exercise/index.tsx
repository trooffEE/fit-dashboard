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

  return (
    <>
      {exercises.map((exercise) => (
        <ExerciseCard data={exercise} />
      ))}
    </>
  )
}

export default Exercise
