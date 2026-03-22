export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍽️</span>
            <span className="text-lg font-semibold text-white">
              AllergenFree
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Helping people with allergies find safe places to eat.
          </p>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AllergenFree
          </p>
        </div>
      </div>
    </footer>
  )
}
