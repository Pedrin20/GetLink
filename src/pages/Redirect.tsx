import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../firebase'

export function Redirect() {
  const { linkId } = useParams<{ linkId: string }>()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function redirect() {
      if (!linkId) {
        setError('Link inválido')
        return
      }

      try {
        const ref = doc(db, 'links', linkId)
        const snap = await getDoc(ref)

        if (!snap.exists()) {
          setError('Link não encontrado')
          return
        }

        const data = snap.data()
        const url = data.url

        await updateDoc(ref, {
          clicks: increment(1),
        })

        window.location.href = url.startsWith('http') ? url : `https://${url}`
      } catch (err) {
        setError('Erro ao redirecionar')
        console.error(err)
      }
    }

    redirect()
  }, [linkId, navigate])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)]">
        <div className="text-center">
          <p className="text-2xl mb-2">😕</p>
          <p className="text-[var(--color-muted)]">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent mx-auto" />
        <p className="mt-4 text-[var(--color-muted)]">Redirecionando...</p>
      </div>
    </div>
  )
}					