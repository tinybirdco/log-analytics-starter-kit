import { useRouter } from 'next/router'
import { queryPipe } from '../../api'
import {
  ErrorsPerParam,
  ErrorsPerParamQueryData,
  ERROR_PARAM_OPTIONS,
  isErrorParam,
} from '../../types/errors-per-param'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'errors_per_param'

async function getErrorsPerParam(
  errorBy: string,
  date_from?: string,
  date_to?: string
): Promise<ErrorsPerParam> {
  const { data } = await queryPipe<ErrorsPerParamQueryData>(PIPE_NAME, {
    param: errorBy,
    date_from,
    date_to,
  })

  const errorCountPerParam = data.map(d => ({
    name: d.param,
    value: d.error_count,
  }))

  return {
    data,
    errorCountPerParam,
  }
}

export default function useErrorsPerParam() {
  const { startDate, endDate } = useDateFilter()
  const router = useRouter()
  const { error_by: errorByParam } = router.query
  const errorBy = isErrorParam(errorByParam)
    ? errorByParam
    : ERROR_PARAM_OPTIONS[0].value
  const query = useQuery(
    [errorBy, startDate, endDate, PIPE_NAME],
    getErrorsPerParam
  )
  const setErrorBy = (errorBy: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('error_by', errorBy)
    router.push(
      {
        query: searchParams.toString(),
      },
      undefined,
      { scroll: false }
    )
  }

  return {
    errorBy,
    setErrorBy,
    ...query,
  }
}
