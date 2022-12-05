import { queryPipe } from '../../api'
import { CallPerIPQueryData, CallsPerIP } from '../../types/calls-per-ip'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'calls_per_ip'

async function getCallsPerIP(
  date_from?: string,
  date_to?: string
): Promise<CallsPerIP> {
  const { data } = await queryPipe<CallPerIPQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  })

  const callCountPerIPTotal = Object.entries(
    data.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.ip_address]: (acc[curr.ip_address] ?? 0) + curr.total,
      }),
      {} as Record<string, number>
    )
  )
    .map(([ip, count]) => ({ ip, count }))
    .sort((a, b) => a.count - b.count)

  const callCountAverage = ~~(
    callCountPerIPTotal.reduce((acc, curr) => acc + curr.count, 0) /
    callCountPerIPTotal.length
  )

  const callCountPerTimeAverageVSTotal = data.map(d => ({
    ...d,
    average: callCountAverage,
  }))

  const callCountPerIPOverAverage = callCountPerIPTotal
    .filter(d => d.count > callCountAverage)
    .concat({ ip: 'average', count: callCountAverage })
    .sort((a, b) => a.count - b.count)

  return {
    data,
    callCountAverage,
    callCountPerIPTotal,
    callCountPerTimeAverageVSTotal,
    callCountPerIPOverAverage,
  }
}

export default function useCallsPerIP() {
  const { startDate, endDate } = useDateFilter()
  return useQuery([startDate, endDate, PIPE_NAME], getCallsPerIP)
}
