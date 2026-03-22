import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createReview } from '../../api/client'
import { useStore } from '../../store/useStore'
import StarRating from './StarRating'

interface Props {
  restaurantId: number
  onReviewAdded: () => void
}

export default function ReviewForm({ restaurantId, onReviewAdded }: Props) {
  const { user } = useStore()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!user) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-gray-500 text-sm">
          <Link to="/login" className="text-primary-600 hover:underline">
            Log in
          </Link>{' '}
          to leave a review.
        </p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a rating.')
      return
    }

    setLoading(true)
    setError('')
    try {
      await createReview({
        restaurantId,
        userId: user.id,
        userName: user.name,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      })
      setRating(0)
      setComment('')
      onReviewAdded()
    } catch {
      setError('Failed to submit review.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Rating
        </label>
        <StarRating rating={rating} onChange={setRating} size="md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comment
        </label>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 font-medium disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Post Review'}
      </button>
    </form>
  )
}
