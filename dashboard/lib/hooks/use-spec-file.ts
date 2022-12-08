import SwaggerParser from '@apidevtools/swagger-parser'
import yaml from 'js-yaml'
import { useState } from 'react'

export default function useSpecFile() {
  const [spec, setSpec] = useState<object>()

  const onSpecFileUpload = ([specFile]: File[]) => {
    const reader = new FileReader()
    reader.addEventListener('load', event => {
      const result = String(event.target?.result)
      const parsed = specFile.name.endsWith('.json')
        ? JSON.parse(String(result))
        : yaml.load(result)
      SwaggerParser.validate(parsed).then(setSpec)
    })
    reader.readAsText(specFile)
  }

  return {
    spec,
    onSpecFileUpload,
  }
}
