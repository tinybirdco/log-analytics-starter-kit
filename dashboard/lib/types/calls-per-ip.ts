export type CallPerIPQueryData = {
  minute: string
  ip_address: string
  total: number
}

export type CallsPerIP = {
  data: CallPerIPQueryData[]
  callCountAverage: number
  callCountPerIPTotal: {
    ip: string
    count: number
  }[]
  callCountPerTimeAverageVSTotal: (CallPerIPQueryData & { average: number })[]
  callCountPerIPOverAverage: {
    ip: string
    count: number
  }[]
}
