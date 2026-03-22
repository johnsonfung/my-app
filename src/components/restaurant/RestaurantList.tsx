import { Restaurant, Review } from '../../types'
import RestaurantCard from './RestaurantCard'

interface Props {
  restaurants: Restaurant[]
  reviews: Review[]
}

export default function RestaurantList({ restaurants, reviews }: Props) {
  const getStats = (id: number) => {
    const r = reviews.filter((rev) => rev.restaurantId === id)
    if (r.length === 0) return { avgRating: undefined, reviewCount: 0 }
    const avg = r.reduce((sum, rev) => sum + rev.rating, 0) / r.length
    return { avgRating: avg, reviewCount: r.length }
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No restaurants found.</p>
        <p className="text-gray-400 text-sm mt-1">
          Try adjusting your filters or search query.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {restaurants.map((r) => {
        const { avgRating, reviewCount } = getStats(r.id)
        return (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            avgRating={avgRating}
            reviewCount={reviewCount}
          />
        )
      })}
    </div>
  )
}
