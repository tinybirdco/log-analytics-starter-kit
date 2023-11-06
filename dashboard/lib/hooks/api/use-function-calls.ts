import { queryPipe } from '../../api'
import {
  FunctionCalls,
  FunctionCallsQueryData,
} from '../../types/function-calls'
import { LogLevelType } from '../../types/log-level'
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

  const logLevelGrouped = data.reduce<
    Record<string, Record<Lowercase<LogLevelType>, number>>
  >((acc, { hour, log_level, total }) => {
    const curValue = acc[hour] ?? {}
    const curLogLevel = log_level.toLowerCase() as Lowercase<LogLevelType>
    curValue[curLogLevel] = curValue[curLogLevel] ?? 0 + total

    return {
      ...acc,
      [hour]: curValue,
    }
  }, {})

  const logLevelFrequency = Object.entries(logLevelGrouped).map(
    ([hour, frequencies]) => ({ hour, ...frequencies })
  )

  return logLevelFrequency
}

export default function useFunctionCalls() {
  const { from, to } = useDateFilter()
  return useQuery([from, to, PIPE_NAME], getFunctionCalls)
}
