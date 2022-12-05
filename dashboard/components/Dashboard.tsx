import BasicStats from './BasicStats'
import ErrorStats from './ErrorStats'
import ThreatDetection from './ThreatDetection'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <BasicStats />
      <ErrorStats />
      <ThreatDetection />
    </div>
  )
}
