import { RangeValue } from 'rc-picker/lib/interface'
import momentGenerateConfig from 'rc-picker/lib/generate/moment'
import moment, { Moment } from 'moment'
import { DateFilter, dateFormat } from '../../lib/types/date-filter'
import { RightArrowIcon } from '../Icons'
import generatePicker from 'antd/es/date-picker/generatePicker'

const BaseDatePicker = generatePicker<Moment>(momentGenerateConfig)

type DatePickerProps = {
  onChange: (value: DateFilter, startDate?: Moment, endDate?: Moment) => void
  startDate?: string
  endDate?: string
}

export default function DatePicker({
  onChange,
  startDate,
  endDate,
}: DatePickerProps) {
  const handleChange = (range: RangeValue<Moment>) => {
    if (!range) return
    const [startDate, endDate] = range
    if (!startDate || !endDate) return
    onChange(DateFilter.Custom, startDate, endDate)
  }

  return (
    <BaseDatePicker.RangePicker
      onClick={ev => {
        ev.preventDefault()
        ev.stopPropagation()
      }}
      separator={<RightArrowIcon />}
      format={dateFormat}
      suffixIcon={null}
      allowClear={false}
      bordered={false}
      open
      defaultValue={[
        moment(startDate, dateFormat),
        moment(endDate, dateFormat).subtract(1, 'days'),
      ]}
      onChange={handleChange}
      className="flex gap-2 mr-2"
      popupClassName="hidden"
    />
  )
}
