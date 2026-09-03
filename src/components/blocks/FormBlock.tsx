import { useState } from 'react'
import type { FormBlockData } from '../../types'

export function FormBlock({ data }: { data: FormBlockData; isEditing?: boolean }) {
  const [submitted, setSubmitted] = useState(false)
  const fields = data.fields?.length ? data.fields : ['Nome', 'E-mail']

  if (submitted) {
    return (
      <div className="rounded-2xl p-8 text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <div className="mb-3 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
            style={{ background: 'var(--block-accent, #8B5CF6)', color: 'white' }}>✓</div>
        </div>
        <p className="font-semibold" style={{ color: 'var(--block-text)' }}>
          {data.successMessage || 'Enviado com sucesso!'}
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <div className="p-5">
        <h3 className="mb-3 font-bold" style={{ color: 'var(--block-text)' }}>
          {data.title || 'Fale comigo'}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="flex flex-col gap-3"
        >
          {fields.map((field) => (
            <input
              key={field}
              type={field.toLowerCase().includes('mail') ? 'email' : 'text'}
              placeholder={field}
              required
              className="rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              style={{
                border: '1px solid var(--block-border)',
                background: 'transparent',
                color: 'var(--block-text)',
              }}
            />
          ))}
          <button
            type="submit"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--block-accent, #8B5CF6)' }}
          >
            {data.buttonText || 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}
