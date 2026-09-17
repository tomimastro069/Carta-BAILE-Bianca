import { useState } from 'react'
import RSVPModal from './RSVPModal'

const WHATSAPP_NUMBER = '5492615367418'
const gold = '#c9a84c'

export default function InvitationCard() {
  const [confirmed, setConfirmed] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleConfirmed = (mensaje: string) => {
    setConfirmed(true)
    setShowModal(false)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, '_blank')
  }

  return (
    <div
      className="flex flex-col items-center"
      style={{ maxWidth: 480, margin: '0 auto' }}
    >
      <div className="relative w-full">
        <img
          src="/Invitation.png"
          alt="Invitación XV Bianca"
          className="w-full shadow-lg rounded-sm"
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center bg-white"
          style={{
            top: '58%',
            width: '25%',
            height: '3.5%',
            color: '#1b3a6b',
            fontFamily: "serif",
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
          }}
        >
          00:00
        </div>
      </div>

      <button
        onClick={() => setShowModal(true)}
        disabled={confirmed}
        className="mt-8 flex items-center gap-2.5 px-7 py-3 text-xs uppercase tracking-[0.18em] transition-all duration-300"
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 600,
          background: confirmed
            ? 'rgba(201,168,76,0.1)'
            : 'linear-gradient(135deg, #b8902e 0%, #e8c96a 50%, #b8902e 100%)',
          color: confirmed ? gold : '#000000',
          border: `1px solid ${gold}`,
          borderRadius: 2,
          boxShadow: confirmed ? 'none' : '0 6px 28px rgba(124, 99, 29, 0.4)',
          cursor: confirmed ? 'default' : 'pointer',
        }}
      >
        <WhatsAppIcon confirmed={confirmed} />
        {confirmed ? '¡Asistencia confirmada! 🎉' : 'Confirmar asistencia'}
      </button>

      {!confirmed && (
        <p
          className="mt-2 text-xs"
          style={{
            color: 'rgba(27, 58, 107, 0.6)',
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 400,
          }}
        >
          Abre WhatsApp con mensaje prellenado
        </p>
      )}

      {showModal && (
        <RSVPModal onClose={() => setShowModal(false)} onConfirmed={handleConfirmed} />
      )}
    </div>
  )
}

function WhatsAppIcon({ confirmed }: { confirmed: boolean }) {
  const gold = '#c9a84c'

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={confirmed ? gold : '#0a0f2e'}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
    </svg>
  )
}
