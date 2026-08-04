import { ReactNode } from 'react'
import { Sidebar } from '../components/Sidebar'

type Props = {
  children: ReactNode
  noSideBar?: boolean
}

export function MainLayout({ children, noSideBar = false }: Props) {
  if (noSideBar) {
    return (
      <div className="min-h-screen bg-[var(--color-paper)]">
        <main className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <Sidebar />
      <div className="ml-64 min-h-screen">
        <main className="p-6 sm:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
    )
  }