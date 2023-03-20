import { Popover } from '@headlessui/react'
import { presetSchemas } from '@tinybirdco/mockingbird'
import { TextInput } from '@tremor/react'
import { useRef, useState } from 'react'
import useAuth from '../lib/hooks/use-auth'
import { HostType } from '../lib/types/credentials'
import { cx } from '../lib/utils'
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
    <div className="flex items-center gap-0.5">
      <p className="flex items-center bg-blue-500 text-white font-bold text-sm px-4 py-2 h-10 rounded-tl rounded-bl">
        Generate data
      </p>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={cx(
                'text-white p-3 bg-blue-500 hover:bg-blueHover1',
                open && 'bg-blueHover2 hover:bg-blueHover2'
              )}
              disabled={isGenerating}
            >
              <CogIcon />
            </Popover.Button>

            {open && !isGenerating && (
              <Popover.Panel className="z-[2] absolute w-[213.3px] top-11 -right-[42.15px] flex flex-col shadow gap-2 bg-white rounded p-2">
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
            )}
          </>
        )}
      </Popover>

      <button
        className={cx(
          'p-3 text-white bg-blue-500 hover:bg-blueHover1 rounded-tr rounded-br',
          isGenerating && 'bg-blueHover2 hover:bg-blueHover2'
        )}
        onClick={onGenerateClick}
      >
        {isGenerating ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  )
}
