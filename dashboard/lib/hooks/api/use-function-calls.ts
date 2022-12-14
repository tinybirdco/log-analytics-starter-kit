import { queryPipe } from '../../api'
import {
  FunctionCalls,
  FunctionCallsQueryData,
} from '../../types/function-calls'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'log_level_frequency_api'

async function getFunctionCalls(
  date_from?: string,
  date_to?: string
): Promise<FunctionCalls> {
  const { data } = await queryPipe<FunctionCallsQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  })

  const logLevelFrequency = data.map(({ hour, log_level, total }) => ({
    hour,
    info: 0,
    warn: 0,
    error: 0,
    [log_level.toLowerCase()]: total,
  }))

  return logLevelFrequency
}

export default function useFunctionCalls() {
  const { startDate, endDate } = useDateFilter()
  return useQuery([startDate, endDate, PIPE_NAME], getFunctionCalls)
}
