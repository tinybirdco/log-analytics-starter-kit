import dynamic from 'next/dynamic'
import { useDropzone } from 'react-dropzone'

import { Card } from '@tremor/react'

import useAPITester from '../lib/hooks/use-spec-file'

import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false })

export default function APITester() {
  const { spec, onSpecFileUpload } = useAPITester()
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onSpecFileUpload,
    accept: {
      'application/json': ['.json'],
      'application/x-yaml': ['.yaml', '.yml'],
    },
    multiple: false,
  })

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg leading-6 text-tertiary">
            Function Library
          </h2>

          {spec && (
            <div {...getRootProps()}>
              <span className="font-medium text-bluw-600 cursor-pointer">
                Upload OpenAPI spec
              </span>
              <input {...getInputProps()} />
            </div>
          )}
        </div>

        {spec ? (
          <SwaggerUI spec={spec} />
        ) : (
          <div className="mx-auto max-w-xl" {...getRootProps()}>
            <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-bluw-600">
                  Upload OpenAPI spec
                </span>
              </span>
              <input
                type="file"
                name="file_upload"
                className="hidden"
                {...getInputProps()}
              />
            </label>
          </div>
        )}
      </div>
    </Card>
  )
}
