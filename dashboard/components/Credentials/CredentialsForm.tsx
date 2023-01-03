import { FormEvent, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, SelectBox, SelectBoxItem } from '@tremor/react'
import Input from '../Input'

import { HostType } from '../../lib/types/credentials'
import { OptionType } from '../../lib/types/options'

const hostOptions: OptionType<HostType>[] = [
  { label: HostType.Eu, value: HostType.Eu },
  { label: HostType.Us, value: HostType.Us },
  { label: 'Other', value: HostType.Other },
]
export default function CredentialsForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [hostType, setHostType] = useState<HostType>(hostOptions[0].value)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const { token } = Object.fromEntries(formData) as Record<string, string>
    const hostName = hostType
    if (!token || (hostType === HostType.Other && !hostName)) return
    const host = hostType === HostType.Other ? hostName : hostType
    const params = new URLSearchParams({ token, host })
    router.push({ pathname: router.pathname, search: params.toString() })
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col justify-between h-full"
      aria-labelledby="credentials-title"
    >
      <div className="space-y-10">
        <Input
          label="Token"
          id="token"
          name="token"
          helperMessage="Copy the token named dashboard generated with your log-analytics project."
          placeholder="p.eyJ3kdsfk2395IjogImMzZTMwNDIxLTYwNzctNGZhMS1iMjY1LWQwM2JhZDIzZGRlOCIsICJpZCI6ICIwYmUzNTgzNi0zODAyLTQwMmUtOTUxZi0zOWFm"
        />
        <div className="flex items-end gap-10">
          <div className="flex-1">
            <SelectBox
              defaultValue={hostOptions[0].value}
              placeholder="Host"
              handleSelect={setHostType}
            >
              {hostOptions.map(({ label, value }) => (
                <SelectBoxItem key={value} text={label} value={value} />
              ))}
            </SelectBox>
          </div>
          <div className="flex-1">
            {hostType === HostType.Other && (
              <Input
                id="hostName"
                name="hostName"
                placeholder="Host name"
                label="Host name"
                isSrLabel
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Button
            text="View dashboard"
            handleClick={() => formRef.current?.requestSubmit()}
          />
          <p className="text-xs text-neutral-64 mt-3">
            Not sure what to do next?{' '}
            <a
              href="https://github.com/tinybirdco/log-analytics-starter-kit#tinybird-log-analytics-starter-kit"
              target="blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              The README for this Starter Kit
            </a>{' '}
            explains how to get started
          </p>
        </div>
      </div>
    </form>
  )
}
