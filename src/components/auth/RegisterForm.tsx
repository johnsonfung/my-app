import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Allergen } from '../../types'
import { ALLERGENS } from '../../data/allergens'
import { createUser, getUserByEmail } from '../../api/client'
import { useStore } from '../../store/useStore'

export default function RegisterForm() {
  const { setUser } = useStore()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [allergenProfile, setAllergenProfile] = useState<Allergen[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleAllergen = (a: Allergen) => {
    setAllergenProfile((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const existing = await getUserByEmail(email)
      if (existing) {
        setError('An account with this email already exists.')
        return
      }

      const user = await createUser({
        name,
        email,
        password,
        allergenProfile,
      })
      setUser(user)
      navigate('/')
    } catch {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Allergen Profile
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Select the allergens you need to avoid. This helps personalize your
          experience.
        </p>
        <div className="flex flex-wrap gap-2">
          {ALLERGENS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => toggleAllergen(a.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                allergenProfile.includes(a.id)
                  ? `${a.color} border-transparent`
                  : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-600 text-white py-2.5 rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-600 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  )
}
