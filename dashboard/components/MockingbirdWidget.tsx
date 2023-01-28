import {
  initializeGenerator,
  presetSchemas,
  generate,
} from '@tinybirdco/data-generator'
import useAuth from '../lib/hooks/use-auth'
import { HostType } from '../lib/types/credentials'

import { TinybirdIcon } from './Icons'

export default function MockingbirdWidget() {
  const { token, host } = useAuth()

  const onGenerateClick = async () => {
    const endpoint =
      host === HostType.Eu ? 'eu_gcp' : host === HostType.Us ? 'us_gcp' : host

    initializeGenerator({
      schema: presetSchemas['Log Analytics Starter Kit'],
      endpoint,
      datasource: 'logs',
      token,
      eps: 20,
      limit: 20,
    })
    await generate()
  }

  return (
    <div className="fixed bottom-1/3 right-0 flex group items-center gap-2 bg-success rounded-tl-sm rounded-bl-sm z-50 p-4 w-14 transition-width hover:w-44">
      <TinybirdIcon size={20} className="text-tertiary" />
      <button
        className="hidden group-hover:block whitespace-nowrap text-tertiary font-semibold"
        onClick={onGenerateClick}
      >
        Generate data
      </button>
    </div>
  )
}
