import { useState } from 'react'

import { Button, Card, SelectBox, SelectBoxItem } from '@tremor/react'

import useAPITester from '../lib/hooks/use-api-tester'
import { EdgeFunction } from '../lib/types/edge-function'

export default function APITester() {
  const { functions, sendValidRequest, sendInvalidRequest, response } =
    useAPITester()
  const [selectedFunction, setSelectedFunction] = useState<EdgeFunction>(
    functions[0]
  )

  return (
    <Card>
      <div className="flex flex-col gap-6 ">
        <h2 className="font-semibold text-lg leading-6 text-tertiary">
          Function Library
        </h2>

        <div className="w-fit">
          <SelectBox
            defaultValue={functions[0]?.name}
            handleSelect={setSelectedFunction}
          >
            {functions.map(({ name }) => (
              <SelectBoxItem key="name" text={name} value={name} />
            ))}
          </SelectBox>
        </div>

        <div className="grid sm:grid-cols-3 gap-y-4">
          <div className="flex flex-col">
            <p>Description:</p>
            <p>{selectedFunction?.description}</p>
          </div>

          <div className="flex flex-col">
            <p>URL:</p>
            <p>{selectedFunction?.url}</p>
          </div>

          <div className="flex flex-col">
            <p>Params:</p>

            <p>
              {(selectedFunction?.params ?? []).map(
                ({ name, type, isRequired }) => (
                  <>
                    `${name}: ${type}${isRequired && ' : required'}`<br />
                  </>
                )
              )}
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-12 pt-6 font-type-writer">
          {response}
        </div>

        <div className="border-t border-neutral-12 pt-6 flex items-center justify-center sm:justify-end gap-4 sm:gap-8">
          <Button
            text="Send invalid request"
            importance="secondary"
            handleClick={sendInvalidRequest}
          />
          <Button text="Send valid request" handleClick={sendValidRequest} />
        </div>
      </div>
    </Card>
  )
}
