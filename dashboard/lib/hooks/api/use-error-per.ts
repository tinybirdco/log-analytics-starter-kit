import { useRouter } from 'next/router'
import { queryPipe } from '../../api'
import {
  ErrorParamType,
  ErrorPerParam,
  ErrorPerParamQueryData,
  ERROR_PARAM_OPTIONS,
  isErrorParam,
} from '../../types/error-per-param'
import useDateFilter from '../use-date-filter'
import useQuery from '../use-query'

const PIPE_NAME = 'error_per_api'

async function getErrorPer(
  errorBy: ErrorParamType,
  date_from?: string,
  date_to?: string
): Promise<ErrorPerParam> {
  const { data } = await queryPipe<
    ErrorPerParamQueryData & { per_filter: ErrorParamType }
  >(PIPE_NAME, {
    per_filter: errorBy,
    date_from,
    date_to,
  })

  const errorPerParam = data
    .map(d => ({
      name: d[errorBy]!,
      value: d.total,
    }))
    .sort((a, b) => b.value - a.value)

  return errorPerParam
}

export default function useErrorPer() {
  const { from, to } = useDateFilter()
  const router = useRouter()
  const { error_by: errorByParam } = router.query
  const errorBy = isErrorParam(errorByParam)
    ? errorByParam
    : ERROR_PARAM_OPTIONS[0].value
  const query = useQuery([errorBy, from, to, PIPE_NAME], getErrorPer)
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
