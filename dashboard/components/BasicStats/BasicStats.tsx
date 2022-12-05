import { Card, AreaChart, BarList, Title, Bold } from '@tremor/react'
import Loader from '../Loader'

import useCallsPerFunction from '../../lib/hooks/api/use-calls-per-functions'
import useTotalCalls from '../../lib/hooks/api/use-total-calls'

export default function BasicStatsContent() {
  const { data: totalCallsData, status: totalCallsStatus } = useTotalCalls()
  const { data: callsPerFunctionData, status: callsPerFunctionStatus } =
    useCallsPerFunction()

  return (
    <Card>
      <Title>Basic Stats</Title>
      <div className="grid grid-cols-2 mt-6 gap-10">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
          <Bold>Function Calls</Bold>
          {totalCallsStatus === 'loading' ? (
            <Loader />
          ) : (
            <AreaChart
              data={totalCallsData ?? []}
              categories={['total']}
              dataKey="hour"
              colors={['blue']}
            />
          )}
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
          <Bold>Top Functions</Bold>
          {callsPerFunctionStatus === 'loading' ? (
            <Loader />
          ) : (
            <BarList data={callsPerFunctionData ?? []} />
          )}
        </div>
      </div>
    </Card>
  )
}
