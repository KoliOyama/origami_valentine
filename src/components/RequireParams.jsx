import { useSearchParams, Navigate } from 'react-router-dom'

/**
 * HOC wrapper that validates required URL parameters
 * Redirects to home if 'to' or 'from' params are missing
 */
const RequireParams = ({ children }) => {
  const [searchParams] = useSearchParams()
  
  const to = searchParams.get('to')
  const from = searchParams.get('from')

  // Redirect to home if missing required params
  if (!to || !from) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RequireParams
