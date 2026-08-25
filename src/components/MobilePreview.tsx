import type { Block } from '../types'
import { BlockRenderer } from './blocks/BlockRenderer'
import { Smartphone } from 'lucide-react'

type MobilePreviewProps = {
  blocks: Block[]
}

export function MobilePreview({ blocks }: MobilePreviewProps) {
  return (
    <div className="sticky top-8">
      <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3 flex items-center gap-2">
        <Smartphone size={16} />
        Preview mobile
      </h4>
      {/* Phone frame */}
      <div className="mx-auto w-[375px] max-w-full">
        <div className="rounded-[2rem] border-4 border-gray-800 bg-gray-800 p-2 shadow-xl">
          {/* Notch */}
          <div className="flex justify-center mb-1">
            <div className="w-32 h-5 bg-gray-800 rounded-b-2xl" />
          </div>
          {/* Screen */}
          <div className="rounded-[1.5rem] overflow-hidden bg-gray-50 min-h-[600px] max-h-[700px] overflow-y-auto">
            {blocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Smartphone size={32} className="mb-2" />
                <p className="text-xs">Nenhum bloco para preview</p>
              </div>
            ) : (
              <div className="p-3 space-y-3">
                {blocks.map((block) => (
                  <div key={block.id} className="text-sm">
                    <BlockRenderer block={block} isEditing />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Home indicator */}
          <div className="flex justify-center mt-1">
            <div className="w-24 h-1 bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>
      <p className="text-xs text-center text-[var(--color-text-muted)] mt-3">
        Preview em tempo real
      </p>
    </div>
  )
}
