import { useState } from 'react'

import {
  AreaChart,
  BarChart,
  Bold,
  Card,
  Metric,
  Tab,
  TabList,
  Title,
} from '@tremor/react'
import Loader from '../Loader'

import useCallsPerIP from '../../lib/hooks/api/use-calls-per-ip'
import { CallsPerIP } from '../../lib/types/calls-per-ip'
import { cx, formatNumber } from '../../lib/utils'

export default function ThreatDetection() {
  const { data: callsPerIPData, status: callsPerIPStatus } = useCallsPerIP()
  const [selectedTab, setSelectedTab] = useState<keyof CallsPerIP & string>(
    'callCountPerTimeAverageVSTotal'
  )

  return (
    <Card>
      <Title>Threat Detection</Title>

      <div className="my-6">
        <Bold>Average Calls Per IP</Bold>
        <Metric>{formatNumber(callsPerIPData?.callCountAverage, 0)}</Metric>
      </div>

      <div className="flex flex-col gap-9">
        <div className="hidden sm:block">
          <TabList
            defaultValue="callCountPerTimeAverageVSTotal"
            handleSelect={setSelectedTab}
          >
            <Tab
              value="callCountPerTimeAverageVSTotal"
              text="Average Total Function Call vs Current Total Function Calls"
            />
            <Tab value="callCountPerIPTotal" text="IPs With Most Calls" />
            <Tab
              value="callCountPerIPOverAverage"
              text="IPs with Calls that exceed the average rate of calls per IP"
            />
          </TabList>
        </div>

        <div className="flex flex-col gap-10">
          <div
            className={cx(
              'flex flex-col gap-3 sm:[&>:first-child]:hidden',
              selectedTab !== 'callCountPerTimeAverageVSTotal' && 'sm:hidden'
            )}
          >
            <Bold>
              Average Total Function Call vs Current Total Function Calls
            </Bold>

            {callsPerIPStatus === 'loading' ? (
              <Loader />
            ) : (
              <AreaChart
                data={callsPerIPData?.callCountPerTimeAverageVSTotal ?? []}
                categories={['total', 'average']}
                dataKey="minute"
                colors={['blue', 'cyan']}
              />
            )}
          </div>

          <div
            className={cx(
              'flex flex-col gap-3 sm:[&>:first-child]:hidden',
              selectedTab !== 'callCountPerIPTotal' && 'sm:hidden'
            )}
          >
            <Bold>IPs With Most Calls</Bold>

            {callsPerIPStatus === 'loading' ? (
              <Loader />
            ) : (
              <BarChart
                data={callsPerIPData?.callCountPerIPTotal ?? []}
                categories={['count']}
                dataKey="ip"
                colors={['blue']}
              />
            )}
          </div>

          <div
            className={cx(
              'flex flex-col gap-3 sm:[&>:first-child]:hidden',
              selectedTab !== 'callCountPerIPOverAverage' && 'sm:hidden'
            )}
          >
            <Bold>
              IPs with Calls that exceed the average rate of calls per IP
            </Bold>

            {callsPerIPStatus === 'loading' ? (
              <Loader />
            ) : (
              <BarChart
                data={callsPerIPData?.callCountPerIPOverAverage ?? []}
                categories={['count']}
                dataKey="ip"
                colors={['blue']}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
