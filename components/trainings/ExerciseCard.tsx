import React from 'react'
import { ExerciseResponse } from '~/services/trainings'

type Props = {
  data: ExerciseResponse,
}

const ExerciseCard = ({ data }: Props) => {
  return (
    <div>
      {data.name}
    </div>
  )
}

export default ExerciseCard