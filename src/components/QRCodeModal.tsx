import { QRCodeCanvas } from 'qrcode.react'
import { X, Download } from 'lucide-react'
import { useRef } from 'react'

type Props = {
    isOpen: boolean
    onClose: () => void
    url: string
    username: string
}

export function QRCodeModal ({ isOpen, onClose, url, username }: Props) {
    const qrRef = useRef<HTMLDivElement>(null)

    if (!isOpen) return null

    const downloadQR = () => {
        const canvas = qrRef.current?.querySelector('canvas')
        if (canvas) {
            const link = document.createElement('a')
            link.download = `qrcode-${username}.png`
            link.click()
        }
    }


return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--color-muted)] hover:text-[var(--color-ink)] transition"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <h3 className="text-xl font-serif text-[var(--color-ink)] mb-2">
            QR Code do seu perfil
          </h3>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Escaneie com a câmera do celular para acessar seu perfil
          </p>

          <div
            ref={qrRef}
            className="bg-white p-4 rounded-xl inline-block border border-[var(--color-border)] shadow-sm"
          >
            <QRCodeCanvas
              value={url}
              size={200}
              bgColor="#ffffff"
              fgColor="#1C1B1A"
              level="H"
              includeMargin
            />
          </div>

          <p className="text-xs text-[var(--color-muted)] mt-3 break-all">
            {url}
          </p>

          <button
            onClick={downloadQR}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white font-medium rounded-xl hover:brightness-110 transition"
          >
            <Download size={18} />
            Baixar QR Code
          </button>

          <button
          onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Meu perfil no GetLink: ${url}`)}`)}
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:brightness-110 transition"
            >
              Compartilhar no WhatsApp!
          </button>
        </div>
      </div>
    </div>
  )
}