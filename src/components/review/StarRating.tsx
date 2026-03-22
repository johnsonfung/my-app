interface Props {
  rating: number
  onChange?: (rating: number) => void
  size?: 'sm' | 'md'
}

export default function StarRating({ rating, onChange, size = 'sm' }: Props) {
  const sizeClass = size === 'sm' ? 'text-lg' : 'text-2xl'
  const interactive = !!onChange

  return (
    <div className={`flex gap-0.5 ${sizeClass}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={`${
            interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          } transition-transform ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  )
}
