import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Restaurant, Review } from '../types'
import { getRestaurants, getReviews } from '../api/client'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import { ALLERGENS } from '../data/allergens'

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getRestaurants(), fetch('/api/reviews').then((r) => r.json())])
      .then(([rests, revs]) => {
        setRestaurants(rests)
        setReviews(revs)
      })
      .finally(() => setLoading(false))
  }, [])

  const getStats = (id: number) => {
    const r = reviews.filter((rev: Review) => rev.restaurantId === id)
    if (r.length === 0) return { avgRating: undefined, reviewCount: 0 }
    const avg = r.reduce((sum: number, rev: Review) => sum + rev.rating, 0) / r.length
    return { avgRating: avg, reviewCount: r.length }
  }

  // Top rated restaurants
  const topRestaurants = [...restaurants]
    .map((r) => ({ ...r, ...getStats(r.id) }))
    .filter((r) => r.avgRating !== undefined)
    .sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0))
    .slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Eat Out, Worry-Free
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Find restaurants that are safe for your allergies. Browse
            allergen-free dining options submitted by the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/restaurants"
              className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Browse Restaurants
            </Link>
            <Link
              to="/submit"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Submit a Restaurant
            </Link>
          </div>
        </div>
      </section>

      {/* Allergen badges */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            Filter by Big 9 Allergens
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {ALLERGENS.map((a) => (
              <Link
                key={a.id}
                to={`/restaurants`}
                className={`px-4 py-2 rounded-full text-sm font-medium ${a.color} hover:opacity-80 transition-opacity`}
              >
                {a.label}-Free
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top rated */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Top Rated Restaurants
            </h2>
            <Link
              to="/restaurants"
              className="text-primary-600 hover:underline text-sm font-medium"
            >
              View all &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topRestaurants.map((r) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  avgRating={r.avgRating}
                  reviewCount={r.reviewCount}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary-700">
                {restaurants.length}
              </p>
              <p className="text-gray-600">Restaurants Listed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-700">9</p>
              <p className="text-gray-600">Allergens Tracked</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-700">
                {reviews.length}
              </p>
              <p className="text-gray-600">Community Reviews</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
