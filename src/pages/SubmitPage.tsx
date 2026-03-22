import ProtectedRoute from '../components/auth/ProtectedRoute'
import RestaurantForm from '../components/restaurant/RestaurantForm'

export default function SubmitPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Submit a Restaurant
        </h1>
        <p className="text-gray-500 mb-6">
          Know a restaurant that's great for people with allergies? Share it with
          the community.
        </p>
        <RestaurantForm />
      </div>
    </ProtectedRoute>
  )
}
