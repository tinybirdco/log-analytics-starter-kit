import { Card, AreaChart, BarList, Title, Bold } from '@tremor/react'
import Loader from '../Loader'

import useFunctionCalls from '../../lib/hooks/api/use-function-calls'
import useTopFunctions from '../../lib/hooks/api/use-top-functions'

export default function BasicStatsContent() {
  const { data: functionCallsData, status: functionCallsStatus } =
    useFunctionCalls()
  const { data: topFunctionsData, status: topFunctionsStatus } =
    useTopFunctions()

  return (
    <Card>
      <Title>Basic Stats</Title>
      <div className="grid grid-cols-2 mt-6 gap-10">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
          <Bold>Function Calls</Bold>

          {functionCallsStatus === 'loading' ? (
            <Loader />
          ) : (
            <AreaChart
              data={functionCallsData ?? []}
              categories={['info', 'warn', 'error']}
              index="hour"
              colors={['blue', 'amber', 'red']}
            />
          )}
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
          <Bold>Top Functions</Bold>

          <div className="max-h-96 overflow-y-auto">
            {topFunctionsStatus === 'loading' ? (
              <Loader />
            ) : (
              <BarList data={topFunctionsData ?? []} />
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
