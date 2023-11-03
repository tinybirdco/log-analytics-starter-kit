import { queryPipe } from '../../api'
import {
  IPsWithMostCalls,
  IPsWithMostCallsQueryData,
} from '../../types/ips-with-most-calls'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'ips_with_most_calls_api'

async function getIPsWithMostCalls(
  date_from?: string,
  date_to?: string
): Promise<IPsWithMostCalls> {
  const { data } = await queryPipe<IPsWithMostCallsQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  })

  return data.sort((a, b) => a.total - b.total)
}

export default function useIPsWithMostCalls() {
  const { from, to } = useDateFilter()
  return useQuery([from, to, PIPE_NAME], getIPsWithMostCalls)
}
