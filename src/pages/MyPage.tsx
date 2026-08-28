import { useAuth } from '../hooks/useAuth'
import { PageBuilder } from '../components/builder/PageBuilder'

export function MyPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[oklch(0.58_0.24_285)] border-t-transparent" />
      </div>
    )
  }

  return <PageBuilder userId={user.uid} />
}
