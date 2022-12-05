export type ErrorsPerFunctionQueryData = {
  event_ts: string
  function_name: string
  was_error: number
  osname: string
  osverison: string
  browsername: string
  browserversion: string
  country: string
  referer: string
}

export type ErrorsPerFunction = {
  data: ErrorsPerFunctionQueryData[]
  errorCountAverage: number
  errorCountPerTime: { event_ts: string; was_error: number }[]
  errorCountPerFunctionTotal: { function_name: string; count: number }[]
  errorCountPerFunctionOverAverage: { name: string; value: number }[]
  errorCountPerFunctionAverage: { name: string; value: number }[]
}
