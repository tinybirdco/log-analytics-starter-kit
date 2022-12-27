import { Popover } from '@headlessui/react'

import { CalendarIcon, QuestionIcon } from '../Icons'
import Select from '../Select'
import { OptionType } from '../../lib/types/options'
import { DateFilter as DateFilterType } from '../../lib/types/date-filter'
import useDateFilter from '../../lib/hooks/use-date-filter'
import dynamic from 'next/dynamic'
import Loader from '../Loader'

const DatePicker = dynamic(() => import('./DatePicker'), {
  ssr: false,
  loading: () => <Loader size={16} />,
})

const dateFilterOptions: OptionType<DateFilterType>[] = [
  { label: 'Today', value: DateFilterType.Today },
  { label: 'Yesterday', value: DateFilterType.Yesterday },
  { label: 'Last 7 days', value: DateFilterType.Last7Days },
  { label: 'Last 30 days', value: DateFilterType.Last30Days },
  { label: 'Last 12 months', value: DateFilterType.Last12Months },
  { label: 'Custom date', value: DateFilterType.Custom },
]

export default function DateFilter() {
  const { lastDays, startDate, endDate, setDateFilter } = useDateFilter()

  return (
    <div className="flex items-center gap-4">
      <iframe
        // TODO: add &count=true, change width to 170
        src="https://ghbtns.com/github-btn.html?user=tinybirdco&repo=log-analytics-starter-kit&type=star&size=large"
        width="75"
        height="30"
        title="GitHub"
      />

      <Popover className="relative h-4">
        <Popover.Button>
          <QuestionIcon className="text-secondaryLight" />
          <div className="sr-only">What is the time zone used?</div>
        </Popover.Button>

        <Popover.Panel className="absolute bottom-6 -right-10 bg-secondary text-white text-xs font-light rounded py-1 px-2 z-[2] w-24">
          UTC timezone
        </Popover.Panel>
      </Popover>

      <div className="min-w-[165px]">
        <Select
          id="lastDays"
          options={dateFilterOptions}
          value={lastDays}
          icon={<CalendarIcon className="text-secondaryLight" />}
          onChange={setDateFilter}
          renderButton={
            lastDays === DateFilterType.Custom ? (
              <DatePicker
                onChange={setDateFilter}
                endDate={endDate}
                startDate={startDate}
              />
            ) : null
          }
        />
      </div>
    </div>
  )
}
