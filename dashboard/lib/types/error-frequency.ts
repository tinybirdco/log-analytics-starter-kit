export type ErrorFrequencyQueryData = {
  function_name: string
  hour: string
  total: number
}

export type ErrorFrequency = { hour: string; total: number }[]
