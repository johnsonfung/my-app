import { Navigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user } = useStore()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
