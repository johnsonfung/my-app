import { Allergen } from '../../types'
import { getAllergenInfo } from '../../data/allergens'

interface Props {
  allergen: Allergen
  size?: 'sm' | 'md'
}

export default function AllergenBadge({ allergen, size = 'sm' }: Props) {
  const info = getAllergenInfo(allergen)
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

  return (
    <span
      className={`inline-block rounded-full font-medium ${info.color} ${sizeClasses}`}
    >
      {info.label}-Free
    </span>
  )
}
