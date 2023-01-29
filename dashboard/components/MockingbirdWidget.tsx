import { Popover } from '@headlessui/react'
import { presetSchemas } from '@tinybirdco/mockingbird'
import { TextInput } from '@tremor/react'
import { useRef, useState } from 'react'
import useAuth from '../lib/hooks/use-auth'
import { HostType } from '../lib/types/credentials'
import { createWorker, startWorker, stopWorker } from '../lib/workerBuilder'

import { CogIcon, PauseIcon, PlayIcon } from './Icons'

export default function MockingbirdWidget() {
  const { token: authToken, host: authHost } = useAuth()
  const [token, setToken] = useState(authToken ?? '')
  const [host, setHost] = useState(authHost ?? '')
  const [eps, setEPS] = useState('10')
  const [limit, setLimit] = useState('-1')
  const worker = useRef<Worker>()
  const [isGenerating, setIsGenerating] = useState(false)

  const onGenerateClick = async () => {
    if (isGenerating) {
      if (!worker.current) return

      stopWorker(worker.current)
      worker.current = undefined
      setIsGenerating(false)
    } else {
      const endpoint =
        host === HostType.Eu ? 'eu_gcp' : host === HostType.Us ? 'us_gcp' : host

      if (!endpoint || !token) return

      const parsedEPS = parseInt(eps) || 1
      const parsedLimit = parseInt(limit) || -1

      worker.current = createWorker({
        schema: presetSchemas['Log Analytics Starter Kit'],
        endpoint,
        datasource: 'logs',
        token,
        eps: parsedEPS,
        limit: parsedLimit < 0 && parsedLimit !== -1 ? -1 : parsedLimit,
      })

      if (!worker.current) return

      startWorker(worker.current)
      setIsGenerating(true)
    }
  }

  return (
    <div className="flex items-center divide-x-2 divide-tertiary bg-success rounded-sm px-3 py-2">
      <p className="whitespace-nowrap text-tertiary font-semibold pr-2">
        Generate data
      </p>
      <Popover className="relative h-4">
        <Popover.Button className="text-tertiary px-2">
          <CogIcon />
        </Popover.Button>

        <Popover.Panel className="absolute top-6 border-t-2 flex flex-col shadow gap-2 border-tertiary -right-[38px] bg-body text-tertiary rounded-bl rounded-br py-2 px-2 z-[2] w-[188.4px]">
          <TextInput
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="Token"
          />
          <TextInput
            value={host}
            onChange={e => setHost(e.target.value)}
            placeholder="Host"
          />
          <TextInput
            value={eps}
            onChange={e => setEPS(e.target.value)}
            placeholder="EPS"
          />
          <TextInput
            value={limit}
            onChange={e => setLimit(e.target.value)}
            placeholder="Limit"
          />
        </Popover.Panel>
      </Popover>

      <button className="text-tertiary pl-2" onClick={onGenerateClick}>
        {isGenerating ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  )
}
