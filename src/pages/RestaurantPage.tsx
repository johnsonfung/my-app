import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Restaurant, Review } from '../types'
import { getRestaurant, getReviews } from '../api/client'
import AllergenBadge from '../components/restaurant/AllergenBadge'
import MapView from '../components/map/MapView'
import ReviewList from '../components/review/ReviewList'
import ReviewForm from '../components/review/ReviewForm'
import StarRating from '../components/review/StarRating'

export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>()
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const loadReviews = useCallback(async () => {
    if (!id) return
    const revs = await getReviews(parseInt(id))
    setReviews(revs)
  }, [id])

  useEffect(() => {
    if (!id) return
    const numId = parseInt(id)
    Promise.all([getRestaurant(numId), getReviews(numId)])
      .then(([rest, revs]) => {
        setRestaurant(rest)
        setReviews(revs)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Not Found</h1>
        <p className="text-gray-500">This restaurant doesn't exist.</p>
        <Link
          to="/restaurants"
          className="text-primary-600 hover:underline mt-4 inline-block"
        >
          &larr; Back to browse
        </Link>
      </div>
    )
  }

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/restaurants"
        className="text-primary-600 hover:underline text-sm mb-4 inline-block"
      >
        &larr; Back to browse
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {restaurant.name}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span>{restaurant.address}</span>
          {restaurant.phone && <span>{restaurant.phone}</span>}
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(avgRating)} />
            <span className="text-sm text-gray-500">
              {avgRating.toFixed(1)} ({reviews.length} review
              {reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
        )}
      </div>

      {/* Allergen badges */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          This restaurant is free of:
        </h2>
        <div className="flex flex-wrap gap-2">
          {restaurant.allergenFree.map((a) => (
            <AllergenBadge key={a} allergen={a} size="md" />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <p className="text-gray-700 leading-relaxed">{restaurant.description}</p>
        {restaurant.website && (
          <p className="mt-3">
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline text-sm"
            >
              Visit website &rarr;
            </a>
          </p>
        )}
      </div>

      {/* Map */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Location</h2>
        <MapView
          restaurants={[restaurant]}
          center={[restaurant.lat, restaurant.lng]}
          zoom={15}
          className="h-[300px]"
        />
      </div>

      {/* Reviews */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h2>
        <div className="mb-6">
          <ReviewForm restaurantId={restaurant.id} onReviewAdded={loadReviews} />
        </div>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  )
}
