import React from 'react'
import { ExerciseResponse } from '~/services/trainings'

type Props = {
  data: ExerciseResponse,
  onClick: () => void
}

const TrainingCard = ({ data, onClick }: Props) => {
  const isEnabled = data.enabled
  const classColors = isEnabled
    ? `border-greenAccent/60 bg-greenAccent/60 hover:border-white/20 hover:bg-greenAccent/80`
    : `border-gray/80 bg-gray/80 hover:border-white/20 hover:bg-gray`

  return (
    <div
      className={`col-span-3 flex min-h-[160px] cursor-pointer flex-col justify-between gap-4 rounded-xl border-4 px-8 py-4 transition-colors hover:border-4 ${classColors}`}
      onClick={onClick}
    >
      <div>
        <h6 className="mb-6 text-center text-lg">⛹🏻‍♀️ {data.name}</h6>
        <div className="text-[16px] leading-6">📝 {data.comment}</div>
      </div>
      <div className="text-[16px] leading-6">
        ♨️ Включает в себя упражнений: <span className="text-xl font-bold">{data.exercises.length}</span>{' '}
      </div>
    </div>
  )
}

export default TrainingCard
