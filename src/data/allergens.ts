import { Allergen } from '../types'

export const ALLERGENS: { id: Allergen; label: string; color: string }[] = [
  { id: 'milk', label: 'Milk', color: 'bg-blue-100 text-blue-800' },
  { id: 'eggs', label: 'Eggs', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'fish', label: 'Fish', color: 'bg-cyan-100 text-cyan-800' },
  { id: 'shellfish', label: 'Shellfish', color: 'bg-red-100 text-red-800' },
  { id: 'tree_nuts', label: 'Tree Nuts', color: 'bg-amber-100 text-amber-800' },
  { id: 'peanuts', label: 'Peanuts', color: 'bg-orange-100 text-orange-800' },
  { id: 'wheat', label: 'Wheat', color: 'bg-lime-100 text-lime-800' },
  { id: 'soy', label: 'Soy', color: 'bg-green-100 text-green-800' },
  { id: 'sesame', label: 'Sesame', color: 'bg-purple-100 text-purple-800' },
]

export const getAllergenInfo = (id: Allergen) =>
  ALLERGENS.find((a) => a.id === id)!
