import router from 'next/router'
import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import LoaderContent from '~/components/LoaderContent'
import ExerciseCard from '~/components/trainings/ExerciseCard'
import { AuthContext } from '~/contexts/auth'
import useFetch, { useCodeCheck } from '~/hooks/fetch'
import { ExerciseResponse, fetchExercise } from '~/services/trainings'

type Props = {}

const ExerciseItemPage = (props: Props) => {
  const { redirectTo } = useCodeCheck()
  const { id } = router.query
  const [currentActiveTab, setCurrentActiveTab] = useState(0)
  const [currentTraining, setCurrentTraining] = useState<ExerciseResponse | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const { getUsername } = useContext(AuthContext)
  const [data, isLoading] = useFetch(fetchExercise, [getUsername(), Number(id)], {
    options: { authOnly: true },
    errorInterceptor: () => {
      toast.error('Не удалость получить информацию о выбранной трениировки')
      redirectTo('/exercise')
    },
  })
  useEffect(() => {
    if (data) {
      console.log(data.exercises.find((_, index) => index === currentActiveTab))
      setCurrentTraining(data.exercises.find((_, index) => index === currentActiveTab) as any)
    }
  }, [data, currentActiveTab])

  const activeClass =
    'active text-[18px] inline-block rounded-t-lg bg-whiteSecondary px-5 py-4 text-black dark:bg-gray-800 dark:text-blue-500'
  const inactiveClass =
    'active text-[18px] inline-block rounded-t-lg bg-whiteSecondary/60 px-5 py-4 text-black dark:bg-gray-800 dark:text-blue-500'

  if (isLoading) return 'Загрузка...'

  const TrainingsList = data.exercises.map((item, index) => (
    <li onClick={() => setCurrentActiveTab(index)}>
      <button className={index === currentActiveTab ? activeClass : inactiveClass}>{item.name}</button>
    </li>
  ))


  const Content = (
    <>
      <div className="col-span-full">
        <div className="mb-10 text-center text-3xl">{data.name} ⛹🏻‍♀️</div>
      </div>
      <div className="col-span-5">
        <div className="mb-4 text-xl">Описание тренировки</div>
        <textarea
          id="training_comment"
          rows={12}
          defaultValue={data.comment}
          className="text-md block w-full resize-none rounded-lg border border-gray-300 bg-whiteSecondary p-5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Напишите полезную информацию, являющейся общей для тренировки..."
        ></textarea>
      </div>
      <div className="col-span-7">
        <div className="mb-4 text-xl">Перечень тренировок</div>
        <ul className="flex flex-wrap gap-1 border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
          {TrainingsList}
        </ul>

        {currentTraining && (
          <div className="my-4 flex flex-col gap-5">
            <div className="grid grid-cols-6 items-center text-xl">
              <div className="col-span-2">Название тренировки:</div>
              <input
                type="text"
                id="first_name"
                className="text-md col-span-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Название тренировки"
                value={currentTraining.name}
                disabled={!isEditMode}
                required
              />
            </div>
            <div className="grid grid-cols-6 items-start text-xl">
              <div className="col-span-2">Комментарий к тренировке:</div>
              <textarea
                id="exercise_comment"
                rows={8}
                value={currentTraining.comment}
                disabled={!isEditMode}
                className="text-md col-span-4 block w-full resize-none rounded-lg border border-gray-300 bg-whiteSecondary p-5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Напишите полезную информацию, являющейся общей для тренировки..."
              ></textarea>
            </div>
            {!isEditMode ? 
              <button onClick={() => setIsEditMode(!isEditMode)} type="button" className="w-fit focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                Редактировать
              </button> : (
                <div className="flex gap-4 items-center justify-between">
                  <button onClick={() => setIsEditMode(!isEditMode)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Отмена
                  </button>
                  <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Сохранить
                  </button>
                </div>
              )}
          </div>
        )}
      </div>
    </>
  )

  return (
    <div className="grid grid-cols-12 gap-8">
      <button
        className="col-span-full w-fit rounded-md border border-primaryDark bg-secondary/60 px-3 py-2"
        onClick={() => history.back()}
      >
        Вернуться на экран тренировок
      </button>
      <LoaderContent isLoading={isLoading} content={Content} />
    </div>
  )
}

export default ExerciseItemPage
