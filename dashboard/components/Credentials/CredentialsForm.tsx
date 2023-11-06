import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Select, SelectItem, TextInput } from '@tremor/react'

import { HostType } from '../../lib/types/credentials'
import { OptionType } from '../../lib/types/options'

const hostOptions: OptionType<HostType>[] = [
  { text: HostType.Eu, value: HostType.Eu },
  { text: HostType.Us, value: HostType.Us },
  { text: 'Other', value: HostType.Other },
]

export default function CredentialsForm() {
  const router = useRouter()
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
      onSubmit={handleSubmit}
      className="flex flex-col justify-between h-full"
      aria-labelledby="credentials-title"
    >
      <div className="space-y-10">
        <div className="space-y-1">
          <label className="block text-sm font-normal text-neutral-64">
            Token
          </label>
          <TextInput
            name="token"
            placeholder="p.eyJ3kdsfk2395IjogImMzZTMwNDIxLTYwNzctNGZhMS1iMjY1LWQwM2JhZDIzZGRlOCIsICJpZCI6ICIwYmUzNTgzNi0zODAyLTQwMmUtOTUxZi0zOWFm"
          />
          <p className="text-xs text-secondaryLight">
            Copy the token named dashboard generated with your web-analytics
            project.
          </p>
        </div>
        <div className="flex items-end gap-10">
          <div className="flex-1">
            <label className="block text-sm font-normal text-neutral-64 mb-1">
              Host
            </label>
            <Select
              value={hostType}
              onValueChange={value => setHostType(value as HostType)}
            >
              {hostOptions.map(({ text, value }) => (
                <SelectItem key={value} value={value}>
                  {text}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex-1">
            {hostType === HostType.Other && (
              <>
                <label className="block text-sm font-normal text-neutral-64 mb-1">
                  Host name
                </label>
                <TextInput name="hostName" placeholder="Host name" />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Button type="submit">View dashboard</Button>
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
