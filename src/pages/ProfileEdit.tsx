import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function ProfileEdit() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/dashboard/my-page', { replace: true })
  }, [navigate])
  return null
}
