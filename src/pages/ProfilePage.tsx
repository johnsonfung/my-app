import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Restaurant, Review } from '../types'
import { getRestaurants, getAllReviews } from '../api/client'
import { useStore } from '../store/useStore'
import AllergenBadge from '../components/restaurant/AllergenBadge'
import ProtectedRoute from '../components/auth/ProtectedRoute'

export default function ProfilePage() {
  const { user } = useStore()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getRestaurants(), getAllReviews()])
      .then(([rests, revs]) => {
        setRestaurants(rests)
        setReviews(revs)
      })
      .finally(() => setLoading(false))
  }, [])

  const myRestaurants = restaurants.filter((r) => r.submittedBy === user?.id)
  const myReviews = reviews.filter((r: Review) => r.userId === user?.id)

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile header */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {user?.name}
          </h1>
          <p className="text-gray-500 text-sm mb-4">{user?.email}</p>
          {user?.allergenProfile && user.allergenProfile.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Your allergen profile:
              </p>
              <div className="flex flex-wrap gap-2">
                {user.allergenProfile.map((a) => (
                  <AllergenBadge key={a} allergen={a} size="md" />
                ))}
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : (
          <>
            {/* My submissions */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                My Submissions ({myRestaurants.length})
              </h2>
              {myRestaurants.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-500 text-sm">
                    You haven't submitted any restaurants yet.
                  </p>
                  <Link
                    to="/submit"
                    className="text-primary-600 hover:underline text-sm mt-2 inline-block"
                  >
                    Submit one now &rarr;
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {myRestaurants.map((r) => (
                    <Link
                      key={r.id}
                      to={`/restaurants/${r.id}`}
                      className="block bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow"
                    >
                      <h3 className="font-medium text-gray-900">{r.name}</h3>
                      <p className="text-sm text-gray-500">{r.address}</p>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* My reviews */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                My Reviews ({myReviews.length})
              </h2>
              {myReviews.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-500 text-sm">
                    You haven't written any reviews yet.
                  </p>
                  <Link
                    to="/restaurants"
                    className="text-primary-600 hover:underline text-sm mt-2 inline-block"
                  >
                    Browse restaurants &rarr;
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {myReviews.map((rev: Review) => {
                    const rest = restaurants.find(
                      (r) => r.id === rev.restaurantId
                    )
                    return (
                      <Link
                        key={rev.id}
                        to={`/restaurants/${rev.restaurantId}`}
                        className="block bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {rest?.name ?? 'Unknown Restaurant'}
                            </h3>
                            <div className="flex items-center gap-1 text-yellow-400 text-sm mt-0.5">
                              {'★'.repeat(rev.rating)}
                              {'☆'.repeat(5 - rev.rating)}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {rev.comment}
                        </p>
                      </Link>
                    )
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </ProtectedRoute>
  )
}
