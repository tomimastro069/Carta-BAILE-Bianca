import { useState } from 'react'

const gold = '#c9a84c'

interface Acompanante {
  nombre: string
  dni: string
}

interface RSVPEntry {
  nombre: string
  apellido: string
  dni: string
  acompanantes: Acompanante[]
  fecha: string
}

interface RSVPModalProps {
  onClose: () => void
  onConfirmed: (message: string) => void
}

const inputStyle: React.CSSProperties = {
  fontFamily: "'Raleway', sans-serif",
  fontSize: 14,
  padding: '10px 12px',
  border: '1px solid rgba(201,168,76,0.4)',
  borderRadius: 2,
  background: '#fff',
  color: '#1B3A6B',
  width: '100%',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'Raleway', sans-serif",
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: '0.05em',
  color: '#1B3A6B',
  marginBottom: 4,
  display: 'block',
}

async function saveConfirmacion(entry: RSVPEntry) {
  const res = await fetch('/api/confirmaciones', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  })
  if (!res.ok) throw new Error('No se pudo guardar la confirmación')
}

export default function RSVPModal({ onClose, onConfirmed }: RSVPModalProps) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [dni, setDni] = useState('')
  const [conFamilia, setConFamilia] = useState<'no' | 'si' | null>(null)
  const [cantidad, setCantidad] = useState(1)
  const [acompanantes, setAcompanantes] = useState<Acompanante[]>([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleCantidadChange = (update: number | ((prev: number) => number)) => {
    setCantidad((prev) => {
      const raw = typeof update === 'function' ? update(prev) : update
      const n = Math.min(10, Math.max(1, raw))
      setAcompanantes((prevAcompanantes) => {
        const next = [...prevAcompanantes]
        while (next.length < n) next.push({ nombre: '', dni: '' })
        return next.slice(0, n)
      })
      return n
    })
  }

  const updateAcompanante = (i: number, field: keyof Acompanante, value: string) => {
    setAcompanantes((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], [field]: value }
      return next
    })
  }

  const handleSubmit = async () => {
    if (!nombre.trim() || !apellido.trim() || !dni.trim()) {
      setError('Completá nombre, apellido y DNI.')
      return
    }
    if (conFamilia === null) {
      setError('Indicá si venís con más personas.')
      return
    }
    if (conFamilia === 'si' && acompanantes.some((a) => !a.nombre.trim() || !a.dni.trim())) {
      setError('Completá nombre y DNI de todos los acompañantes.')
      return
    }

    const entry: RSVPEntry = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      dni: dni.trim(),
      acompanantes: conFamilia === 'si' ? acompanantes : [],
      fecha: new Date().toISOString(),
    }

    setSaving(true)
    setError('')
    try {
      await saveConfirmacion(entry)
    } catch {
      setSaving(false)
      setError('No se pudo guardar la confirmación. Probá de nuevo.')
      return
    }
    setSaving(false)

    let mensaje = `¡Hola! Confirmo mi asistencia a los XV de Bianca el viernes 9 de octubre.\nNombre: ${entry.nombre} ${entry.apellido}\nDNI: ${entry.dni}`

    if (entry.acompanantes.length > 0) {
      mensaje += `\nVoy acompañado/a de ${entry.acompanantes.length} persona(s):`
      entry.acompanantes.forEach((a, i) => {
        mensaje += `\n${i + 1}. ${a.nombre} - DNI: ${a.dni}`
      })
    } else {
      mensaje += '\nVoy sin acompañantes.'
    }

    onConfirmed(mensaje)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(10, 15, 46, 0.55)' }}
      onClick={onClose}
    >
      <div
        className="w-full flex flex-col"
        style={{
          maxWidth: 440,
          maxHeight: '90vh',
          background: '#f9f7f2',
          border: `1px solid ${gold}`,
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.3)' }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 18,
              color: '#1B3A6B',
            }}
          >
            Confirmar asistencia
          </h3>
          <button
            onClick={onClose}
            style={{ color: gold, fontSize: 20, lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto flex flex-col gap-4">
          <div>
            <label style={labelStyle}>Nombre</label>
            <input style={inputStyle} value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div>
            <label style={labelStyle}>Apellido</label>
            <input style={inputStyle} value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </div>

          <div>
            <label style={labelStyle}>DNI</label>
            <input style={inputStyle} value={dni} onChange={(e) => setDni(e.target.value)} inputMode="numeric" />
          </div>

          <div>
            <label style={labelStyle}>¿Vas con más personas (familia/invitados)?</label>
            <div className="flex gap-3 mt-1">
              <button
                type="button"
                onClick={() => setConFamilia('no')}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 13,
                  borderRadius: 2,
                  border: `1px solid ${gold}`,
                  background: conFamilia === 'no' ? gold : 'transparent',
                  color: conFamilia === 'no' ? '#fff' : '#1B3A6B',
                  cursor: 'pointer',
                }}
              >
                No, voy solo/a
              </button>
              <button
                type="button"
                onClick={() => {
                  setConFamilia('si')
                  handleCantidadChange(cantidad)
                }}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 13,
                  borderRadius: 2,
                  border: `1px solid ${gold}`,
                  background: conFamilia === 'si' ? gold : 'transparent',
                  color: conFamilia === 'si' ? '#fff' : '#1B3A6B',
                  cursor: 'pointer',
                }}
              >
                Sí, voy con más
              </button>
            </div>
          </div>

          {conFamilia === 'si' && (
            <>
              <div>
                <label style={labelStyle}>¿Cuántas personas más?</label>
                <div className="flex items-center gap-4 mt-1">
                  <button
                    type="button"
                    onClick={() => handleCantidadChange((prev) => prev - 1)}
                    disabled={cantidad <= 1}
                    style={{
                      width: 40,
                      height: 40,
                      fontSize: 18,
                      fontFamily: "'Raleway', sans-serif",
                      border: `1px solid ${gold}`,
                      borderRadius: 2,
                      background: 'transparent',
                      color: cantidad <= 1 ? 'rgba(27,58,107,0.3)' : '#1B3A6B',
                      cursor: cantidad <= 1 ? 'default' : 'pointer',
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: 18,
                      color: '#1B3A6B',
                      minWidth: 24,
                      textAlign: 'center',
                    }}
                  >
                    {cantidad}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCantidadChange((prev) => prev + 1)}
                    disabled={cantidad >= 10}
                    style={{
                      width: 40,
                      height: 40,
                      fontSize: 18,
                      fontFamily: "'Raleway', sans-serif",
                      border: `1px solid ${gold}`,
                      borderRadius: 2,
                      background: 'transparent',
                      color: cantidad >= 10 ? 'rgba(27,58,107,0.3)' : '#1B3A6B',
                      cursor: cantidad >= 10 ? 'default' : 'pointer',
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {acompanantes.map((a, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 p-3"
                    style={{ border: '1px solid rgba(201,168,76,0.3)', borderRadius: 2 }}
                  >
                    <p style={{ ...labelStyle, marginBottom: 0 }}>Acompañante {i + 1}</p>
                    <input
                      style={inputStyle}
                      placeholder="Nombre y apellido"
                      value={a.nombre}
                      onChange={(e) => updateAcompanante(i, 'nombre', e.target.value)}
                    />
                    <input
                      style={inputStyle}
                      placeholder="DNI"
                      inputMode="numeric"
                      value={a.dni}
                      onChange={(e) => updateAcompanante(i, 'dni', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {error && (
            <p style={{ color: '#b8433a', fontFamily: "'Raleway', sans-serif", fontSize: 12 }}>{error}</p>
          )}
        </div>

        <div className="px-6 py-4" style={{ borderTop: '1px solid rgba(201,168,76,0.3)' }}>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full py-3 text-xs uppercase tracking-[0.18em]"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 600,
              background: 'linear-gradient(135deg, #b8902e 0%, #e8c96a 50%, #b8902e 100%)',
              color: '#000',
              border: `1px solid ${gold}`,
              borderRadius: 2,
              cursor: saving ? 'default' : 'pointer',
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'Guardando...' : 'Confirmar y continuar a WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  )
}
