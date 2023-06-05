import React, { useEffect, useState } from 'react'
import ExerciseCard from '~/components/trainings/ExerciseCard'
import { ExerciseResponse, fetchAllExercises } from '~/services/trainings'

type Props = {}

const Exercise = (props: Props) => {
  const [exercises, setExercises] = useState<ExerciseResponse[]>([])

  useEffect(() => {
    fetchAllExercises()
      .then(({ data }) => {
        setExercises(data)
      })
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