import React, { useContext } from 'react'
import { AuthContext } from '~/contexts/auth'
import useFetch from '~/hooks/fetch'
import { fetchAllExercises } from '~/services/trainings'

type Props = {}


const ExercisePage = (props: Props) => {
  const { getUsername } = useContext(AuthContext)
  const [data, isLoading] = useFetch(fetchAllExercises, [getUsername()], { options: { authOnly: true }})
  console.log(data)
  return (
    <div>ExercisePage</div>
  )
}

export default ExercisePage