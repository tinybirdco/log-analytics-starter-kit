import { useState } from 'react'
import { Tab, TabList } from '@tremor/react'

import Meta from '../components/Meta'
import ErrorModal from '../components/ErrorModal'
import Credentials from '../components/Credentials'
import DateFilter from '../components/DateFilter'
import APITester from '../components/APITester'
import Dashboard from '../components/Dashboard'

import useAuth from '../lib/hooks/use-auth'
import useAPITester from '../lib/hooks/use-spec-file'

export default function Home() {
  const { isAuthenticated, isTokenValid } = useAuth()
  const [selectedTab, setSelectedTab] = useState<'APITester' | 'Dashboard'>(
    'APITester'
  )
  const { spec, onSpecFileUpload } = useAPITester()

  return (
    <>
      <Meta />

      <div className="bg-body min-h-screen py-5 px-5 sm:px-10 text-sm leading-5 text-secondary">
        <header>
          <img src="/icon.png" alt="" width={24} height={24} />
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-7 mb-10 w-f">
            <h1 className="font-semibold text-lg leading-6">
              Log Analytics Starter Kit
            </h1>
            {selectedTab === 'Dashboard' && (
              <div className="justify-self-end">
                <DateFilter />
              </div>
            )}
          </div>
        </header>

        <main>
          <div className="mb-6">
            <TabList
              defaultValue="APITester"
              handleSelect={value => setSelectedTab(value)}
            >
              <Tab value="APITester" text="API Tester" />
              <Tab value="Dashboard" text="Dashboard" />
            </TabList>
          </div>

          {isAuthenticated && !isTokenValid && <ErrorModal />}
          {isAuthenticated &&
            isTokenValid &&
            (selectedTab === 'APITester' ? (
              <APITester spec={spec} onSpecFileUpload={onSpecFileUpload} />
            ) : (
              <Dashboard />
            ))}
          {!isAuthenticated && <Credentials />}
        </main>

        {isAuthenticated && (
          <footer className="flex flex-col items-center justify-center gap-2 mt-20">
            <p>
              Build with speed and privacy first using{' '}
              <a
                href="https://tinybird.co"
                target="_blank"
                rel="noreferrer"
                className="text-primary"
              >
                Tinybird
              </a>
            </p>
            <a
              href="https://github.com/tinybirdco/vercel-functions-starter-kit"
              target="blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              Customize this dashboard
            </a>
          </footer>
        )}
      </div>
    </>
  )
}
