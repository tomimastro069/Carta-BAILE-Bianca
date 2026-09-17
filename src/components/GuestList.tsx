import { useEffect, useState } from 'react'

const gold = '#c9a84c'
const PAGE_SIZE = 5

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

export default function GuestList() {
  const [lista, setLista] = useState<RSVPEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  const cargar = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/confirmaciones', { cache: 'no-store' })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setLista(data)
    } catch {
      setError('No se pudo cargar la lista de invitados.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  const totalPersonas = lista.reduce((acc, e) => acc + 1 + e.acompanantes.length, 0)
  const totalPages = Math.max(1, Math.ceil(lista.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = lista.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <section className="py-12 px-4" style={{ background: 'transparent' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-2"
            style={{ color: gold, fontFamily: "'Raleway', sans-serif" }}
          >
            Lista de invitados
          </p>
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(2rem, 6vw, 2.8rem)',
              background: 'linear-gradient(90deg, #e8c96a 0%, #b8902e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Invitados confirmados
          </h2>
          <div
            className="mx-auto mt-4"
            style={{
              width: 80,
              height: 1,
              background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
            }}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: '#1B3A6B', fontFamily: "'Raleway', sans-serif" }}>
            {lista.length} confirmaciones · {totalPersonas} personas en total
          </p>
          <button
            onClick={cargar}
            className="text-xs uppercase tracking-[0.15em] px-4 py-2"
            style={{
              fontFamily: "'Raleway', sans-serif",
              border: `1px solid ${gold}`,
              borderRadius: 2,
              color: '#1B3A6B',
              background: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
            }}
          >
            Recargar
          </button>
        </div>

        {loading && (
          <p style={{ color: '#1B3A6B', fontFamily: "'Raleway', sans-serif" }}>Cargando...</p>
        )}
        {error && (
          <p style={{ color: '#b8433a', fontFamily: "'Raleway', sans-serif" }}>{error}</p>
        )}

        {!loading && !error && lista.length === 0 && (
          <p style={{ color: 'rgba(27,58,107,0.6)', fontFamily: "'Raleway', sans-serif" }}>
            Todavía no hay confirmaciones.
          </p>
        )}

        <div className="flex flex-col gap-4">
          {pageItems.map((e, i) => (
            <div
              key={`${currentPage}-${i}`}
              className="p-4 shadow-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: 4,
              }}
            >
              <p style={{ fontWeight: 600, color: '#1B3A6B', fontFamily: "'Raleway', sans-serif" }}>
                {e.nombre} {e.apellido}{' '}
                <span style={{ fontWeight: 400 }}>— DNI {e.dni}</span>
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: 'rgba(27,58,107,0.6)', fontFamily: "'Raleway', sans-serif" }}
              >
                {new Date(e.fecha).toLocaleString('es-AR')}
              </p>

              {e.acompanantes.length > 0 && (
                <div className="mt-2">
                  <p
                    className="text-xs uppercase tracking-[0.1em]"
                    style={{ color: gold, fontFamily: "'Raleway', sans-serif" }}
                  >
                    Acompañantes ({e.acompanantes.length})
                  </p>
                  <ul
                    className="mt-1 text-sm"
                    style={{ color: '#1B3A6B', fontFamily: "'Raleway', sans-serif" }}
                  >
                    {e.acompanantes.map((a, j) => (
                      <li key={j}>
                        {a.nombre} — DNI {a.dni}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-xs uppercase tracking-[0.15em] px-4 py-2"
              style={{
                fontFamily: "'Raleway', sans-serif",
                border: `1px solid ${gold}`,
                borderRadius: 2,
                color: currentPage === 1 ? 'rgba(27,58,107,0.35)' : '#1B3A6B',
                background: 'rgba(255,255,255,0.7)',
                cursor: currentPage === 1 ? 'default' : 'pointer',
              }}
            >
              Anterior
            </button>

            <span
              className="text-xs"
              style={{ color: '#1B3A6B', fontFamily: "'Raleway', sans-serif" }}
            >
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="text-xs uppercase tracking-[0.15em] px-4 py-2"
              style={{
                fontFamily: "'Raleway', sans-serif",
                border: `1px solid ${gold}`,
                borderRadius: 2,
                color: currentPage === totalPages ? 'rgba(27,58,107,0.35)' : '#1B3A6B',
                background: 'rgba(255,255,255,0.7)',
                cursor: currentPage === totalPages ? 'default' : 'pointer',
              }}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
