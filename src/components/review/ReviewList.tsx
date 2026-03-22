import { Review } from '../../types'
import StarRating from './StarRating'

interface Props {
  reviews: Review[]
}

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <p className="text-gray-400 text-sm py-4">
        No reviews yet. Be the first to leave one!
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-gray-50 rounded-lg p-4 border border-gray-100"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-medium text-gray-900">{review.userName}</p>
              <StarRating rating={review.rating} />
            </div>
            <span className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
