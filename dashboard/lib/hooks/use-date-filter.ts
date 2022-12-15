import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { DateFilter, dateFormat } from '../types/date-filter'

export default function useDateFilter() {
  const router = useRouter()

  const setDateFilter = useCallback(
    (value: DateFilter, startDate?: Moment, endDate?: Moment) => {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set('last_days', value)

      if (value === DateFilter.Custom && startDate && endDate) {
        searchParams.set('start_date', startDate.format(dateFormat))
        searchParams.set('end_date', endDate.format(dateFormat))
      } else {
        searchParams.delete('start_date')
        searchParams.delete('end_date')
      }
      router.push(
        {
          query: searchParams.toString(),
        },
        undefined,
        { scroll: false }
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const lastDaysParam = router.query.last_days as DateFilter
  const lastDays: DateFilter =
    typeof lastDaysParam === 'string' &&
    Object.values(DateFilter).includes(lastDaysParam)
      ? lastDaysParam
      : DateFilter.Last7Days

  return useMemo(() => {
    const today = moment().utc()

    let startDate, endDate
    if (lastDaysParam === DateFilter.Custom) {
      startDate = moment(router.query.start_date ?? today).subtract(
        !router.query.start_date ? +DateFilter.Last7Days : 0,
        'days'
      )

      endDate = moment(router.query.end_date ?? today)
    } else {
      startDate = moment(today).subtract(+lastDays, 'days')
      endDate = moment(today).subtract(
        lastDaysParam === DateFilter.Yesterday ? +DateFilter.Yesterday : 0,
        'days'
      )
    }

    startDate = startDate.format(dateFormat)
    endDate = endDate.add(1, 'days').format(dateFormat)

    return { lastDays, setDateFilter, startDate, endDate }
  }, [
    lastDaysParam,
    router.query.start_date,
    router.query.end_date,
    lastDays,
    setDateFilter,
  ])
}
