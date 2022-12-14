export type FunctionCallsQueryData = {
  hour: string
  log_level: 'INFO' | 'WARN' | 'ERROR'
  total: number
}

export type FunctionCalls = {
  hour: string
  info: number
  warn: number
  error: number
}[]
