import { EdgeFunction } from '../types/edge-function'

export default function useAPITester() {
  const functions = [] as EdgeFunction[]
  const response = 'print response'
  const sendValidRequest = () => {}
  const sendInvalidRequest = () => {}

  return { functions, sendValidRequest, sendInvalidRequest, response }
}
