const ALL_LOG_LEVEL = ['INFO', 'WARN', 'ERROR'] as const

type LogLevelTuple = typeof ALL_LOG_LEVEL

export type LogLevelType = LogLevelTuple[number]
