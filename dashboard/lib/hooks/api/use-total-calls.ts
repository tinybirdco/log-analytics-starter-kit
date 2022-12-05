import { queryPipe } from '../../api'
import { FunctionCallQueryData } from '../../types/total-calls'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'total_calls'

async function getTotalCalls(
  date_from?: string,
  date_to?: string
): Promise<FunctionCallQueryData[]> {
  const { data } = await queryPipe<FunctionCallQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  })

  return data
}

export default function useTotalCalls() {
  const { startDate, endDate } = useDateFilter()
  return useQuery([startDate, endDate, PIPE_NAME], getTotalCalls)
}
