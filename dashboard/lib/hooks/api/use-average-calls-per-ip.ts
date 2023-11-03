import { queryPipe } from '../../api'
import {
  AverageCallsPerIP,
  AverageCallsPerIPQueryData,
} from '../../types/average-calls-per-ip'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'average_calls_per_ip_api'

async function getAverageCallsPerIP(
  date_from?: string,
  date_to?: string
): Promise<AverageCallsPerIP> {
  const { data } = await queryPipe<AverageCallsPerIPQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  })

  const averageCallsPerIP = data[0].average

  return averageCallsPerIP
}

export default function useAverageCallsPerIP() {
  const { from, to } = useDateFilter()
  return useQuery([from, to, PIPE_NAME], getAverageCallsPerIP)
}
