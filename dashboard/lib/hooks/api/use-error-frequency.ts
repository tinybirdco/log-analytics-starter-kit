import { queryPipe } from '../../api'
import {
  ErrorFrequency,
  ErrorFrequencyQueryData,
} from '../../types/error-frequency'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'error_frequency_api'

async function getErrorFrequency(
  date_from?: string,
  date_to?: string
): Promise<ErrorFrequency> {
  const { data } = await queryPipe<ErrorFrequencyQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  })

  const errorFrequency = data.map(({ hour, total }) => ({ hour, total }))

  return errorFrequency
}

export default function useErrorFrequency() {
  const { from, to } = useDateFilter()
  return useQuery([from, to, PIPE_NAME], getErrorFrequency)
}
