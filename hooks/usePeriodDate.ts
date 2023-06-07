import dayjs from 'dayjs'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { start } from 'repl'
import { DateTimePeriod } from '~/services/dashboard'

export const usePeriodDate = () => {
  const [period, setPeriod] = useState<DateTimePeriod>({
    start: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  })

  const goNextWeek = () => {
    const endDate = dayjs(period.end).add(7, 'day')
    const isAllowedToGoNextWeek = dayjs().isAfter(endDate)
    if (isAllowedToGoNextWeek) {
      setPeriod({
        start: dayjs(period.start).add(7, 'day').format('YYYY-MM-DD'),
        end: endDate.format('YYYY-MM-DD'),
      })
    } else {
      toast.warning('В будущем еще нет статистики 🥲')
    }
  }
  const goPreviousWeek = () => {
    const isAllowedToGoPreviousWeek = true
    if (isAllowedToGoPreviousWeek) {
      setPeriod({
        start: dayjs(period.start).subtract(7, 'day').format('YYYY-MM-DD'),
        end: dayjs(period.end).subtract(7, 'day').format('YYYY-MM-DD'),
      })
    }
  }

  return {
    period,
    goNextWeek,
    goPreviousWeek,
  }
}
