export type EdgeFunction = {
  name: string
  description: string
  url: string
  params: { name: string; type: string; isRequired: boolean }[]
}
