import dynamic from 'next/dynamic'

import { Card } from '@tremor/react'

import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false })

type APITesterProps = {
  spec?: object
  onSpecFileUpload: (specFile?: File) => void
}

export default function APITester({ spec, onSpecFileUpload }: APITesterProps) {
  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg leading-6 text-tertiary">
            Function Library
          </h2>

          <label className="relative cursor-pointer font-medium text-blue-500 hover:text-blue-700">
            <span>Upload OpenAPI spec (.json, .yaml)</span>
            <input
              className="sr-only"
              type="file"
              accept="application/json, application/x-yaml"
              onChange={e => onSpecFileUpload(e.target.files?.[0])}
            />
          </label>
        </div>

        {spec && <SwaggerUI spec={spec} />}
      </div>
    </Card>
  )
}
