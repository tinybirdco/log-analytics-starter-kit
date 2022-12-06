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
  SelectBox,
  SelectBoxItem,
} from '@tremor/react'
import Loader from '../Loader'

import useErrorsPerFunction from '../../lib/hooks/api/use-errors-per-functions'
import useErrorsPerParam from '../../lib/hooks/api/use-errors-per-param'
import { ErrorsPerFunction } from '../../lib/types/errors-per-function'
import { ERROR_PARAM_OPTIONS } from '../../lib/types/errors-per-param'
import { cx, formatNumber } from '../../lib/utils'

export default function ErrorStats() {
  const { data: errorsPerFunctionData, status: errorsPerFunctionStatus } =
    useErrorsPerFunction()
  const {
    data: errorsPerParamData,
    status: errorsPerParamStatus,
    errorBy,
    setErrorBy,
  } = useErrorsPerParam()
  const [selectedTab1, setSelectedTab1] = useState<
    keyof ErrorsPerFunction & string
  >('errorCountPerTime')

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
              <Tab
                value="errorCountPerFunctionAverage"
                text="Function Errors"
              />
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
                selectedTab1 !== 'errorCountPerFunctionAverage' && 'sm:hidden'
              )}
            >
              <Bold>Function Errors</Bold>

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

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
          <div className="grid grid-cols-2 items-center">
            <Bold>Error per</Bold>
            <SelectBox defaultValue={errorBy} handleSelect={setErrorBy}>
              {ERROR_PARAM_OPTIONS.map(({ text, value }) => (
                <SelectBoxItem key={value} {...{ text, value }} />
              ))}
            </SelectBox>
          </div>

          {errorsPerParamStatus === 'loading' ? (
            <Loader />
          ) : (
            <BarList data={errorsPerParamData?.errorCountPerParam ?? []} />
          )}
        </div>
      </div>
    </Card>
  )
}
