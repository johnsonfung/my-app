import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/useStore'

export default function Header() {
  const { user, logout } = useStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="text-xl font-bold text-primary-700">
              AllergenFree
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/restaurants"
              className="text-gray-600 hover:text-primary-600 font-medium"
            >
              Browse
            </Link>
            <Link
              to="/submit"
              className="text-gray-600 hover:text-primary-600 font-medium"
            >
              Submit
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-primary-600 font-medium"
                >
                  {user.name}
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-red-500 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <Link
              to="/restaurants"
              className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              Browse
            </Link>
            <Link
              to="/submit"
              className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              Submit
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                  }}
                  className="px-3 py-2 rounded-md text-left text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-primary-600 hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
