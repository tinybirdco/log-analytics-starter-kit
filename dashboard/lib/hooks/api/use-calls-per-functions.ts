import { queryPipe } from '../../api'
import {
  CallPerFunctionQueryData,
  CallPerFunctionChartData,
} from '../../types/calls-per-function'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'calls_per_function'

async function getCallsPerFunction(
  date_from?: string,
  date_to?: string
): Promise<CallPerFunctionChartData[]> {
  const { data } = await queryPipe<CallPerFunctionQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  }).then(res => ({
    ...res,
    data: res.data.map(({ function_name, total }) => ({
      name: function_name,
      value: total,
    })),
  }))

  return data
}

export default function useCallsPerFunction() {
  const { startDate, endDate } = useDateFilter()
  return useQuery([startDate, endDate, PIPE_NAME], getCallsPerFunction)
}
