import { LogLevelType } from './log-level'

export type FunctionCallsQueryData = {
  hour: string
  log_level: LogLevelType
  total: number
}

export type FunctionCall = {
  hour: string
} & Record<Lowercase<LogLevelType>, number>

export type FunctionCalls = FunctionCall[]
