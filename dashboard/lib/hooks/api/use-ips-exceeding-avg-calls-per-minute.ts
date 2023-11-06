import { queryPipe } from '../../api'
import {
  IPsExceedingAvgCallsPerMinute,
  IPsExceedingAvgCallsPerMinuteQueryData,
} from '../../types/ips-exceeding-avg-calls-per-minute'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'ips_exceeding_avg_calls_per_minute_api'

async function getIPsExceedingAvgCallsPerMinute(
  date_from?: string,
  date_to?: string
): Promise<IPsExceedingAvgCallsPerMinute> {
  const { data } = await queryPipe<IPsExceedingAvgCallsPerMinuteQueryData>(
    PIPE_NAME,
    {
      date_from,
      date_to,
    }
  )

  return data
}

export default function useIPsExceedingAvgCallsPerMinute() {
  const { from, to } = useDateFilter()
  return useQuery(
    [from, to, PIPE_NAME],
    getIPsExceedingAvgCallsPerMinute
  )
}
