import { queryPipe } from '../../api'
import {
  FunctionCalls,
  FunctionCallsQueryData,
} from '../../types/function-calls'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'function_calls_api'

async function getFunctionCalls(
  date_from?: string,
  date_to?: string
): Promise<FunctionCalls> {
  const { data } = await queryPipe<FunctionCallsQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  })

  return data
}

export default function useFunctionCalls() {
  const { startDate, endDate } = useDateFilter()
  return useQuery([startDate, endDate, PIPE_NAME], getFunctionCalls)
}
