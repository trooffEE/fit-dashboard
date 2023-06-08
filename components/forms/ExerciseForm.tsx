import React, { useState } from 'react'
import { ExerciseTraining } from '~/services/trainings'

type Props = {
  exercise: ExerciseTraining | null
  onSave: (payload: any) => void
  isHiddenWithCurtain?: boolean
}

const ExerciseForm = ({ exercise, onSave, isHiddenWithCurtain = false }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isCurtain, setIsCurtain] = useState(isHiddenWithCurtain)

  if (!exercise) return null

  if (isCurtain) {
    return (
      <div className="col-span-4 flex flex-col min-h-[160px] gap-4 bg-purple-500 border-white/30 border px-8 py-4 rounded-xl">
        <div className="text-lg">{exercise.name}</div>
        <div className="text-md">{exercise.comment}</div>
        <button
          onClick={() => setIsCurtain(false)}
          type="button"
          className="mb-2 mr-2 h-fit rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Посмотреть детальнее
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="my-4 flex max-w-fit flex-col gap-5 col-span-12">
        <div className="grid grid-cols-6 items-center gap-6 text-xl">
          <div className="col-span-2">Название упражнения:</div>
          <input
            type="text"
            id="first_name"
            className="text-md col-span-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Название тренировки"
            value={exercise.name}
            disabled={!isEditMode}
            required
          />
        </div>
        <div className="grid grid-cols-6 items-start gap-6 text-xl">
          <div className="col-span-2">Комментарий к упражнению:</div>
          <textarea
            id="exercise_comment"
            rows={8}
            value={exercise.comment}
            disabled={!isEditMode}
            className="text-md col-span-4 block w-full resize-none rounded-lg border border-gray-300 bg-whiteSecondary p-5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Напишите полезную информацию, являющейся общей для тренировки..."
          ></textarea>
        </div>
        <div className="grid grid-cols-6 items-center gap-6 text-xl">
          <div className="col-span-1 col-start-3">Подходы</div>
          <input
            type="text"
            id="first_name"
            className="text-md col-span-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Название тренировки"
            value={exercise.sets}
            disabled={!isEditMode}
            required
          />
          <div className="col-span-1">Повторения</div>
          <input
            type="text"
            id="first_name"
            className="text-md col-span-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Название тренировки"
            value={exercise.repeats}
            disabled={!isEditMode}
            required
          />
        </div>
        {!isEditMode ? (
          <div className="flex items-center justify-between gap-6">
            {isHiddenWithCurtain && (
              <button
                onClick={() => setIsCurtain(true)}
                type="button"
                className="bg-purple-500 mb-2 mr-2 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-purple-500/50 transition-all hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 dark:shadow-lg dark:shadow-purple-800/80 dark:focus:ring-purple-800"
              >
                Вернуться назад
              </button>
            )}
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              type="button"
              className="mb-2 mr-2 w-fit rounded-lg bg-yellow-400 px-5 py-2.5 text-lg font-medium text-white transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
            >
              Редактировать
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-6">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              type="button"
              className="mb-2 mr-2 rounded-lg bg-red-400 px-5 py-2.5 text-lg font-medium text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Отмена
            </button>
            <button
              onClick={() => onSave(exercise)}
              type="button"
              className="mb-2 mr-2 rounded-lg bg-green-500 px-5 py-2.5 text-lg font-medium text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Сохранить
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default ExerciseForm
