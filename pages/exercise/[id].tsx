import router from 'next/router'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '~/contexts/auth'
import useFetch, { useCodeCheck } from '~/hooks/fetch'
import { fetchExercise } from '~/services/trainings'

type Props = {}

const ExerciseItemPage = (props: Props) => {
  const { redirectTo } = useCodeCheck()
  const { id } = router.query
  const { getUsername } = useContext(AuthContext)
  const [data, isLoading] = useFetch(fetchExercise, [getUsername(), Number(id)], {
    options: {
      authOnly: true,
    },
    debug: true,
    errorInterceptor: () => {
      toast.error('Не удалость получить информацию о выбранной трениировки')
      redirectTo('/exercise')
    },
  })

  if (isLoading) return 'Загрузка...'

  return (
    <div className="grid grid-cols-12 gap-8">
      <button
        className="col-span-full w-fit rounded-md border border-primaryDark bg-secondary/60 px-3 py-2"
        onClick={() => history.back()}
      >
        Вернуться на экран тренировок
      </button>
      {data && (
        <div className="col-span-full">
          <div>
            {data.name} была создана {data.createdDate}
          </div>
          <textarea className="text-black" defaultValue={data.comment}></textarea>
        </div>
      )}
    </div>
  )
}

export default ExerciseItemPage
