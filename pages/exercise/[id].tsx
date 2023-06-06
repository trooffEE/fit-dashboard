import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '~/contexts/auth'
import useFetch, { useCodeCheck } from '~/hooks/fetch'
import { ExerciseResponse, fetchExercise } from '~/services/trainings'

type Props = {}

const ExerciseItemPage = (props: Props) => {
  const { checkCode, redirectTo } = useCodeCheck()
  const [exercise, setExercise] = useState<ExerciseResponse | null>(null)
  const router = useRouter()
  const { isLoggedIn, getUsername } = useContext(AuthContext)

  useEffect(() => {
    if (isLoggedIn && router.query.id) {
      fetchExercise(getUsername(), Number(router.query.id))
        .then(({ data }) => {
          setExercise(data)
        })
        .catch((data) => {
          if (data.response?.status === 403) {
            checkCode(data)
          } else {
            redirectTo('/exercise')
          }
        })
    }
  }, [router.query.id])

  return (
    <div className="grid grid-cols-12 gap-8">
      <button
        className="col-span-full w-fit rounded-md border border-primaryDark bg-secondary/60 px-3 py-2"
        onClick={() => history.back()}
      >
        Вернуться на экран тренировок
      </button>
      {exercise && <div className="col-span-full">
        <div>
          {exercise.name} была создана {exercise.createdDate}
        </div>
        <textarea className='text-black' defaultValue={exercise.comment}></textarea>
      </div>}
    </div>
  )
}

export default ExerciseItemPage
