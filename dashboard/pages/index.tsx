import Meta from '../components/Meta'
import ErrorModal from '../components/ErrorModal'
import Credentials from '../components/Credentials'
import DateFilter from '../components/DateFilter'
import Dashboard from '../components/Dashboard'
import MockingbirdWidget from '../components/MockingbirdWidget'

import useAuth from '../lib/hooks/use-auth'
import { GithubIcon } from '../components/Icons'

export default function Home() {
  const { isAuthenticated, isTokenValid } = useAuth()

  return (
    <>
      <Meta />

      <div className="bg-body min-h-screen py-5 px-5 sm:px-10 text-sm leading-5 text-secondary">
        {isAuthenticated && isTokenValid && (
          <header>
            <div className="flex items-center justify-between">
              <img src="/icon.png" alt="" width={24} height={24} />
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/tinybirdco/log-analytics-starter-kit"
                  target="blank"
                  rel="noreferrer"
                >
                  <GithubIcon
                    size={24}
                    className="text-gray-700 hover:text-gray-900 cursor-pointer"
                  />
                </a>
                <MockingbirdWidget />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-7 mb-10 w-f">
              <h1 className="font-semibold text-lg leading-6">
                Log Analytics Starter Kit
              </h1>
              <div className="justify-self-end">
                <DateFilter />
              </div>
            </div>
          </header>
        )}

        <main>
          {isAuthenticated && !isTokenValid && <ErrorModal />}
          {isAuthenticated && isTokenValid && <Dashboard />}
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
              href="https://github.com/tinybirdco/log-analytics-starter-kit"
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
