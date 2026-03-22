import { useEffect, useState } from 'react'
import { Restaurant, Review } from '../types'
import { getRestaurants } from '../api/client'
import { useStore } from '../store/useStore'
import RestaurantList from '../components/restaurant/RestaurantList'
import AllergenFilter from '../components/filter/AllergenFilter'
import MapView from '../components/map/MapView'

export default function BrowsePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const { selectedAllergens, searchQuery, sortBy, setSortBy } = useStore()

  useEffect(() => {
    Promise.all([
      getRestaurants(),
      fetch('/api/reviews').then((r) => r.json()),
    ])
      .then(([rests, revs]) => {
        setRestaurants(rests)
        setReviews(revs)
      })
      .finally(() => setLoading(false))
  }, [])

  // Filter restaurants
  let filtered = restaurants.filter((r) => {
    // Allergen filter: restaurant must be free of ALL selected allergens
    if (selectedAllergens.length > 0) {
      const hasAll = selectedAllergens.every((a) => r.allergenFree.includes(a))
      if (!hasAll) return false
    }
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        r.name.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      )
    }
    return true
  })

  // Sort
  const getAvgRating = (id: number) => {
    const r = reviews.filter((rev) => rev.restaurantId === id)
    if (r.length === 0) return 0
    return r.reduce((sum, rev) => sum + rev.rating, 0) / r.length
  }

  if (sortBy === 'rating') {
    filtered = [...filtered].sort(
      (a, b) => getAvgRating(b.id) - getAvgRating(a.id)
    )
  } else {
    filtered = [...filtered].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Browse Restaurants
        </h1>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rating' | 'newest')}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
          >
            <option value="newest">Newest</option>
            <option value="rating">Top Rated</option>
          </select>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm font-medium ${
                viewMode === 'list'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 text-sm font-medium ${
                viewMode === 'map'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Map
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-20">
            <AllergenFilter />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading restaurants...</p>
            </div>
          ) : viewMode === 'list' ? (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''}{' '}
                found
              </p>
              <RestaurantList restaurants={filtered} reviews={reviews} />
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''}{' '}
                on map
              </p>
              <MapView restaurants={filtered} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
