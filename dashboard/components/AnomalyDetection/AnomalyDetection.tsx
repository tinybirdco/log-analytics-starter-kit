import { BarChart, Bold, Card, Metric, Title } from '@tremor/react'
import Loader from '../Loader'

import { formatNumber } from '../../lib/utils'
import useAverageCallsPerIP from '../../lib/hooks/api/use-average-calls-per-ip'
import useIPsWithMostCalls from '../../lib/hooks/api/use-ips-with-most-calls'
import useIPsExceedingAvgCallsPerMinute from '../../lib/hooks/api/use-ips-exceeding-avg-calls-per-minute'

export default function AnomalyDetection() {
  const { data: averageCallsPerIPData, status: averageCallsPerIPStatus } =
    useAverageCallsPerIP()
  const { data: ipsWithMostCallsData, status: ipsWithMostCallsStatus } =
    useIPsWithMostCalls()
  const {
    data: ipsExceedingAvgCallsPerMinuteData,
    status: ipsExceedingAvgCallsPerMinuteStatus,
  } = useIPsExceedingAvgCallsPerMinute()

  return (
    <Card>
      <Title>Anomaly Detection</Title>

      <div className="my-6">
        <Bold>Average Calls Per IP</Bold>
        <Metric>{formatNumber(averageCallsPerIPData, 0)}</Metric>
      </div>

      <div className="grid grid-cols-2 mt-6 gap-10">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
          <Bold>IPs With Most Calls</Bold>

          {ipsWithMostCallsStatus === 'loading' ? (
            <Loader />
          ) : (
            <BarChart
              data={ipsWithMostCallsData ?? []}
              categories={['total']}
              index="ip_address"
              colors={['blue']}
            />
          )}
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
          <Bold>IPs Exceeding The Average Rate</Bold>

          {ipsExceedingAvgCallsPerMinuteStatus === 'loading' ? (
            <Loader />
          ) : (
            <BarChart
              data={ipsExceedingAvgCallsPerMinuteData ?? []}
              categories={['total']}
              index="ip_address"
              colors={['blue']}
            />
          )}
        </div>
      </div>
    </Card>
  )
}
