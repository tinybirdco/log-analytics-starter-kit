import { Popover } from '@headlessui/react'
import { DateRangePicker, DateRangePickerItem } from '@tremor/react'
import moment from 'moment'
import { QuestionIcon } from './Icons'

import {
  DateFilter as DateFilterType,
  DateRangePickerOption,
} from '../lib/types/date-filter'
import useDateFilter from '../lib/hooks/use-date-filter'

const dateFilterOptions: DateRangePickerOption[] = [
  { text: 'Today', value: DateFilterType.Today, from: new Date() },
  {
    text: 'Yesterday',
    value: DateFilterType.Yesterday,
    from: moment().subtract(1, 'days').toDate(),
  },
  {
    text: '7 days',
    value: DateFilterType.Last7Days,
    from: moment().subtract(7, 'days').toDate(),
  },
  {
    text: '30 days',
    value: DateFilterType.Last30Days,
    from: moment().subtract(30, 'days').toDate(),
  },
  {
    text: '12 months',
    value: DateFilterType.Last12Months,
    from: moment().subtract(12, 'months').toDate(),
  },
]

export default function DateFilter() {
  const { dateRangePickerValue, onDateRangePickerValueChange } = useDateFilter()

  return (
    <div className="flex items-center sm:gap-4">
      <Popover className="relative h-4">
        <Popover.Button>
          <QuestionIcon className="text-secondaryLight hidden sm:block" />
          <div className="sr-only">What is the time zone used?</div>
        </Popover.Button>

        <Popover.Panel className="absolute bottom-6 -right-10 bg-secondary text-white text-xs font-light rounded py-1 px-2 z-[2] w-24">
          UTC timezone
        </Popover.Panel>
      </Popover>

      <div className="min-w-[165px]">
        <DateRangePicker
          value={dateRangePickerValue}
          onValueChange={onDateRangePickerValueChange}
          enableYearNavigation
        >
          {dateFilterOptions.map(({ text, value, from }) => (
            <DateRangePickerItem key={text} value={value} from={from}>
              {text}
            </DateRangePickerItem>
          ))}
        </DateRangePicker>
      </div>
    </div>
  )
}
