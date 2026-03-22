import { Link } from 'react-router-dom'
import { Restaurant } from '../../types'
import AllergenBadge from './AllergenBadge'

interface Props {
  restaurant: Restaurant
  avgRating?: number
  reviewCount?: number
}

export default function RestaurantCard({
  restaurant,
  avgRating,
  reviewCount = 0,
}: Props) {
  return (
    <Link
      to={`/restaurants/${restaurant.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-5"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {restaurant.name}
        </h3>
        {avgRating !== undefined && (
          <div className="flex items-center gap-1 text-sm">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{avgRating.toFixed(1)}</span>
            <span className="text-gray-400">({reviewCount})</span>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-3">{restaurant.address}</p>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {restaurant.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {restaurant.allergenFree.map((a) => (
          <AllergenBadge key={a} allergen={a} />
        ))}
      </div>
    </Link>
  )
}
