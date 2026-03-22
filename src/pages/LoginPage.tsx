import LoginForm from '../components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Log In
      </h1>
      <LoginForm />
    </div>
  )
}
