import { queryPipe } from '../../api'
import {
  FunctionErrors,
  FunctionErrorsQueryData,
} from '../../types/function-errors'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'function_errors_api'

async function getFunctionErrors(
  date_from?: string,
  date_to?: string
): Promise<FunctionErrors> {
  const { data } = await queryPipe<FunctionErrorsQueryData>(PIPE_NAME, {
    date_from,
    date_to,
  })

  const functionErrors = data.map(({ function_name, total }) => ({
    name: function_name,
    value: total,
  }))

  return functionErrors
}

export default function useFunctionErrors() {
  const { from, to } = useDateFilter()
  return useQuery([from, to, PIPE_NAME], getFunctionErrors)
}
