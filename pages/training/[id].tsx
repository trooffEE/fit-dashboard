import router from 'next/router'
import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import LoaderContent from '~/components/LoaderContent'
import { AuthContext } from '~/contexts/auth'
import useFetch, { useCodeCheck } from '~/hooks/fetch'
import { ExerciseTraining, fetchTraining } from '~/services/trainings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import ExerciseForm from '~/components/forms/ExerciseForm'

const ExerciseItemPage = () => {
  const { redirectTo } = useCodeCheck()
  const { id } = router.query
  const [currentActiveTab, setCurrentActiveTab] = useState(0)
  const [currentExercise, setCurrentTraining] = useState<ExerciseTraining | null>(null)
  const { getUsername } = useContext(AuthContext)
  const [data, isLoading] = useFetch(fetchTraining, [getUsername(), Number(id)], {
    options: { authOnly: true },
    errorInterceptor: () => {
      toast.error('Не удалость получить информацию о выбранной трениировки')
      redirectTo('/training')
    },
  })
  useEffect(() => {
    if (data) setCurrentTraining(data.exercises.find((_, index) => index === currentActiveTab) as any)
  }, [data, currentActiveTab])

  const activeClass =
    'active text-[18px] inline-block rounded-t-lg bg-whiteSecondary px-5 py-4 text-black dark:bg-gray-800 dark:text-blue-500'
  const inactiveClass =
    'active text-[18px] inline-block rounded-t-lg bg-whiteSecondary/60 px-5 py-4 text-black dark:bg-gray-800 dark:text-blue-500'

  let TrainingsList = [],
    Content = <></>

  if (data) {
    TrainingsList = data.exercises.map((item, index) => (
      <li onClick={() => setCurrentActiveTab(index)}>
        <button className={index === currentActiveTab ? activeClass : inactiveClass}>{item.name}</button>
      </li>
    ))

    Content = (
      <div className="grid grid-cols-12 gap-10">
        <button
          className="col-span-full w-fit rounded-md border border-primaryDark bg-secondary/60 px-3 py-2"
          onClick={() => history.back()}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} /> Вернуться на экран тренировок
        </button>
        <div className="col-span-full">
          <div className="flex w-full items-center gap-2 text-center text-3xl">
            {`${data.name}⛹🏻‍♀️`}
            {data.enabled ? (
              <span className="mr-2 rounded bg-green-300 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                Активна
              </span>
            ) : (
              <span className="mr-2 rounded-full bg-red-300 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                Не активна
              </span>
            )}
          </div>
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
          <div className="mb-4 text-xl">Перечень упражнений</div>
          <ul className="flex flex-wrap gap-1 border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
            {TrainingsList}
          </ul>

          <ExerciseForm exercise={currentExercise} onSave={() => {}} />
        </div>
      </div>
    )
  }

  return <LoaderContent isLoading={isLoading} content={Content} />
}

export default ExerciseItemPage
