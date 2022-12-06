export type ErrorsPerParamQueryData = {
  error_count: number
  function_name: string
  param: string
}

export type ErrorsPerParam = {
  data: ErrorsPerParamQueryData[]
  errorCountPerParam: { name: string; value: number }[]
}

const ALL_ERROR_PARAMS = [
  'osname',
  'ip_address',
  'browsername',
  'country',
  'referer',
] as const

type ErrorParamTuple = typeof ALL_ERROR_PARAMS

export type ErrorParamType = ErrorParamTuple[number]

export function isErrorParam(
  errorParam: string | string[] | undefined
): errorParam is ErrorParamType {
  return ALL_ERROR_PARAMS.includes(errorParam as ErrorParamType)
}

export const ERROR_PARAM_OPTIONS = [
  {
    text: 'OS',
    value: 'osname',
  },
  {
    text: 'IP address',
    value: 'ip_address',
  },
  {
    text: 'Browser',
    value: 'browsername',
  },
  {
    text: 'Country',
    value: 'country',
  },
  {
    text: 'Referer',
    value: 'referer',
  },
]
