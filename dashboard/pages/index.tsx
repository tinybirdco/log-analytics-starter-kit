import Meta from '../components/Meta'
import { Datepicker, Tab, TabList } from '@tremor/react'
import useAuth from '../lib/hooks/use-auth'
import ErrorModal from '../components/ErrorModal'
import Credentials from '../components/Credentials'
import APITester from '../components/APITester'
import { useState } from 'react'
import Dashboard from '../components/Dashboard'
import useDateFilter from '../lib/hooks/use-date-filter'
import { DateFilter } from '../lib/types/date-filter'

export default function Home() {
  const { isAuthenticated, isTokenValid } = useAuth()
  const { setDateFilter } = useDateFilter()
  const [selectedTab, setSelectedTab] = useState<'api-tester' | 'dashboard'>(
    'api-tester'
  )

  return (
    <>
      <Meta />

      <div className="bg-body min-h-screen py-5 px-5 sm:px-10 text-sm leading-5 text-secondary">
        <header>
          <img src="/icon.png" alt="" width={24} height={24} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-7 mb-10 w-f">
            <h1 className="font-semibold text-lg leading-6">
              Vercel Edge Functions Analytics Starter Kit
            </h1>
            {selectedTab === 'dashboard' && (
              <div className="justify-self-end">
                <Datepicker
                  handleSelect={(
                    selectedStartDay: Date,
                    selectedEndDay: Date
                  ) =>
                    setDateFilter(
                      DateFilter.Custom,
                      selectedStartDay,
                      selectedEndDay
                    )
                  }
                />
              </div>
            )}
          </div>
        </header>

        <main>
          <div className="mb-6">
            <TabList
              defaultValue="api-tester"
              handleSelect={value => setSelectedTab(value)}
            >
              <Tab value="api-tester" text="API Tester" />
              <Tab value="dashboard" text="Dashboard" />
            </TabList>
          </div>

          {isAuthenticated && !isTokenValid && <ErrorModal />}
          {isAuthenticated &&
            isTokenValid &&
            (selectedTab === 'api-tester' ? <APITester /> : <Dashboard />)}
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
              href="#"
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
