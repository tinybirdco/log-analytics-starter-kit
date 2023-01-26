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

import useAverageErrorCount from '../../lib/hooks/api/use-average-error-count'
import useErrorFrequency from '../../lib/hooks/api/use-error-frequency'
import useFunctionErrors from '../../lib/hooks/api/use-function-errors'
import useErrorPer from '../../lib/hooks/api/use-error-per'
import { ERROR_PARAM_OPTIONS } from '../../lib/types/error-per-param'
import { cx, formatNumber } from '../../lib/utils'

export default function ErrorStats() {
  const { data: averageErrorCountData, status: averageErrorCountStatus } =
    useAverageErrorCount()
  const { data: errorFrequencyData, status: errorFrequencyStatus } =
    useErrorFrequency()
  const { data: functionErrorsData, status: functionErrorsStatus } =
    useFunctionErrors()
  const {
    data: errorsPerParamData,
    status: errorsPerParamStatus,
    errorBy,
    setErrorBy,
  } = useErrorPer()
  const [selectedTab, setSelectedTab] = useState<
    'ErrorsFrequency' | 'FunctionErrors'
  >('ErrorsFrequency')

  return (
    <Card>
      <Title>Error Stats</Title>

      <div className="my-6">
        <Bold>Average Error Count</Bold>
        <Metric>{formatNumber(averageErrorCountData, 0)}</Metric>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-9">
          <div className="hidden sm:block">
            <TabList
              defaultValue="ErrorsFrequency"
              onValueChange={setSelectedTab}
            >
              <Tab value="ErrorsFrequency" text="Error Frequency" />
              <Tab value="FunctionErrors" text="Function Errors" />
            </TabList>
          </div>

          <div className="flex flex-col gap-10">
            <div
              className={cx(
                'flex flex-col gap-3 sm:[&>:first-child]:hidden',
                selectedTab !== 'ErrorsFrequency' && 'sm:hidden'
              )}
            >
              <Bold>Error Frequency</Bold>

              {errorFrequencyStatus === 'loading' ? (
                <Loader />
              ) : (
                <AreaChart
                  data={errorFrequencyData ?? []}
                  categories={['total']}
                  dataKey="hour"
                  colors={['blue']}
                />
              )}
            </div>

            <div
              className={cx(
                'flex flex-col gap-3 sm:[&>:first-child]:hidden',
                selectedTab !== 'FunctionErrors' && 'sm:hidden'
              )}
            >
              <Bold>Function Errors</Bold>

              <div className="max-h-96 overflow-y-auto">
                {functionErrorsStatus === 'loading' ? (
                  <Loader />
                ) : (
                  <BarList data={functionErrorsData ?? []} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-9">
          <div className="grid grid-cols-2 items-center">
            <Bold>Error Per</Bold>

            <SelectBox defaultValue={errorBy} onValueChange={setErrorBy}>
              {ERROR_PARAM_OPTIONS.map(({ text, value }) => (
                <SelectBoxItem key={value} {...{ text, value }} />
              ))}
            </SelectBox>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {errorsPerParamStatus === 'loading' ? (
              <Loader />
            ) : (
              <BarList data={errorsPerParamData ?? []} />
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
