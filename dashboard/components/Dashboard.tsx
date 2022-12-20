import BasicStats from './BasicStats'
import ErrorStats from './ErrorStats'
import AnomalyDetection from './AnomalyDetection'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 [&>*]:min-h-[450px]">
      <BasicStats />
      <ErrorStats />
      <AnomalyDetection />
    </div>
  )
}
