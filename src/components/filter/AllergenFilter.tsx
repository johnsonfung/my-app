import { ALLERGENS } from '../../data/allergens'
import { useStore } from '../../store/useStore'

export default function AllergenFilter() {
  const { selectedAllergens, toggleAllergen, clearFilters, searchQuery, setSearchQuery } =
    useStore()

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-700">
            Allergen-Free Filters
          </h3>
          {selectedAllergens.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs text-primary-600 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="space-y-1">
          {ALLERGENS.map((a) => (
            <label
              key={a.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedAllergens.includes(a.id)}
                onChange={() => toggleAllergen(a.id)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{a.label}-Free</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
