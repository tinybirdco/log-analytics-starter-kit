import { useState } from 'react'

import SwaggerParser from '@apidevtools/swagger-parser'
import yaml from 'js-yaml'
import useSWR from 'swr'

export default function useSpecFile() {
  const [spec, setSpec] = useState<object>()
  useSWR('swagger-file', () => fetch('/swagger.json'), {
    onSuccess: res => res.blob().then(res => readSpecFile(res, 'json')),
  })

  const readSpecFile = (file: Blob, format: 'json' | 'yaml') => {
    const reader = new FileReader()

    reader.addEventListener('load', event => {
      const result = String(event.target?.result)
      const parsed = format === 'json' ? JSON.parse(result) : yaml.load(result)
      parsed.servers = [
        ...(parsed.servers ?? []),
        { url: window.location.origin },
      ]
      SwaggerParser.validate(parsed).then(setSpec)
    })

    reader.readAsText(file)
  }

  const onSpecFileUpload = (specFile?: File) => {
    if (specFile)
      readSpecFile(specFile, specFile.name.endsWith('.json') ? 'json' : 'yaml')
  }

  return {
    spec,
    onSpecFileUpload,
  }
}
