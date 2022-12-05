import { useState } from 'react'

import {
  Card,
  TabList,
  Tab,
  AreaChart,
  BarList,
  Title,
  Metric,
  Bold,
  BarChart,
} from '@tremor/react'
import Loader from '../Loader'

import useErrorsPerFunction from '../../lib/hooks/api/use-errors-per-functions'
import { ErrorsPerFunction } from '../../lib/types/errors-per-function'
import { cx, formatNumber } from '../../lib/utils'

export default function ErrorStats() {
  const { data: errorsPerFunctionData, status: errorsPerFunctionStatus } =
    useErrorsPerFunction()
  const [selectedTab1, setSelectedTab1] = useState<
    keyof ErrorsPerFunction & string
  >('errorCountPerTime')
  const [selectedTab2, setSelectedTab2] = useState<
    keyof ErrorsPerFunction & string
  >('errorCountPerFunctionOverAverage')

  return (
    <Card>
      <Title>Error Stats</Title>

      <div className="my-6">
        <Bold>Average Error Count</Bold>
        <Metric>
          {formatNumber(errorsPerFunctionData?.errorCountAverage, 0)}
        </Metric>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-9">
          <div className="hidden sm:block">
            <TabList
              defaultValue="errorCountPerTime"
              handleSelect={setSelectedTab1}
            >
              <Tab value="errorCountPerTime" text="Error Frequency" />
              <Tab value="errorCountPerFunctionTotal" text="Function Errors" />
            </TabList>
          </div>

          <div className="flex flex-col gap-10">
            <div
              className={cx(
                'flex flex-col gap-3 sm:[&>:first-child]:hidden',
                selectedTab1 !== 'errorCountPerTime' && 'sm:hidden'
              )}
            >
              <Bold>Error Frequency</Bold>

              {errorsPerFunctionStatus === 'loading' ? (
                <Loader />
              ) : (
                <AreaChart
                  data={errorsPerFunctionData?.errorCountPerTime ?? []}
                  categories={['was_error']}
                  dataKey="event_ts"
                  colors={['blue']}
                />
              )}
            </div>

            <div
              className={cx(
                'flex flex-col gap-3 sm:[&>:first-child]:hidden',
                selectedTab1 !== 'errorCountPerFunctionTotal' && 'sm:hidden'
              )}
            >
              <Bold>Function Errors</Bold>

              {errorsPerFunctionStatus === 'loading' ? (
                <Loader />
              ) : (
                <BarChart
                  data={errorsPerFunctionData?.errorCountPerFunctionTotal ?? []}
                  categories={['count']}
                  dataKey="function_name"
                  colors={['blue']}
                />
              )}
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-9">
          <div className="hidden sm:block">
            <TabList
              defaultValue="errorCountPerFunctionOverAverage"
              handleSelect={setSelectedTab2}
            >
              <Tab
                value="errorCountPerFunctionOverAverage"
                text="Average Error Rate % Change"
              />
              <Tab
                value="errorCountPerFunctionAverage"
                text="Average Error Count Per Function"
              />
            </TabList>
          </div>

          <div className="flex flex-col gap-10">
            <div
              className={cx(
                'flex flex-col gap-3 sm:[&>:first-child]:hidden',
                selectedTab2 !== 'errorCountPerFunctionOverAverage' &&
                  'sm:hidden'
              )}
            >
              <Bold>Average Error Rate % Change</Bold>

              {errorsPerFunctionStatus === 'loading' ? (
                <Loader />
              ) : (
                <BarList
                  data={
                    errorsPerFunctionData?.errorCountPerFunctionOverAverage ??
                    []
                  }
                />
              )}
            </div>

            <div
              className={cx(
                'flex flex-col gap-3 sm:[&>:first-child]:hidden',
                selectedTab2 !== 'errorCountPerFunctionAverage' && 'sm:hidden'
              )}
            >
              <Bold>Average Error Count Per Function</Bold>

              {errorsPerFunctionStatus === 'loading' ? (
                <Loader />
              ) : (
                <BarList
                  data={
                    errorsPerFunctionData?.errorCountPerFunctionAverage ?? []
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
