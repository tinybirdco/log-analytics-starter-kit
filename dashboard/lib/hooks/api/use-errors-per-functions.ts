import { queryPipe } from '../../api'
import {
  ErrorsPerFunction,
  ErrorsPerFunctionQueryData,
} from '../../types/errors-per-function'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'errors_per_function'

async function getErrorsPerFunction(
  date_from?: string,
  date_to?: string
): Promise<ErrorsPerFunction> {
  const { data } = await queryPipe<ErrorsPerFunctionQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  })

  const errorCountPerTime = data.map(({ event_ts, was_error }) => ({
    event_ts,
    was_error,
  }))

  const errorCountPerFunctionTotal = Object.entries(
    data.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.function_name]: (acc[curr.function_name] ?? 0) + curr.was_error,
      }),
      {} as Record<string, number>
    )
  )
    .map(([function_name, count]) => ({ function_name, count }))
    .sort((a, b) => a.count - b.count)

  const errorCountAverage = ~~(
    errorCountPerFunctionTotal.reduce((acc, curr) => acc + curr.count, 0) /
    errorCountPerFunctionTotal.length
  )

  const errorCountPerFunctionAverage = errorCountPerFunctionTotal
    .map(({ function_name, count }) => ({ name: function_name, value: count }))
    .sort((a, b) => b.value - a.value)

  const errorCountPerFunctionOverAverage = errorCountPerFunctionAverage
    .filter(d => d.value > errorCountAverage)
    .concat({ name: 'average', value: errorCountAverage })
    .sort((a, b) => b.value - a.value)

  return {
    data,
    errorCountAverage,
    errorCountPerTime,
    errorCountPerFunctionTotal,
    errorCountPerFunctionAverage,
    errorCountPerFunctionOverAverage,
  }
}

export default function useErrorsPerFunction() {
  const { startDate, endDate } = useDateFilter()
  return useQuery([startDate, endDate, PIPE_NAME], getErrorsPerFunction)
}
