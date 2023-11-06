import { queryPipe } from '../../api'
import {
  AverageErrorCount,
  AverageErrorCountQueryData,
} from '../../types/average-error-count'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'average_error_count_api'

async function getAverageErrorCount(
  date_from?: string,
  date_to?: string
): Promise<AverageErrorCount> {
  const { data } = await queryPipe<AverageErrorCountQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  })

  const averageErrorCount = data[0].average

  return averageErrorCount
}

export default function useAverageErrorCount() {
  const { from, to } = useDateFilter()
  return useQuery([from, to, PIPE_NAME], getAverageErrorCount)
}
