export default function LocationSection() {
  return (
    <section
      className="relative py-12 px-6"
      style={{
        background: 'transparent',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: '#c9a84c', fontFamily: "'Raleway', sans-serif" }}
          >
            Cómo llegar
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
            Quinta Fermina Eventos
          </h2>
          <div
            className="mx-auto mt-5 mb-4"
            style={{
              width: 80,
              height: 1,
              background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
            }}
          />
          <p
            className="text-sm"
            style={{
              color: 'rgba(27,58,107,0.8)',
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 400,
            }}
          >
            Mendoza, Argentina
          </p>
        </div>

        {/* Map + info layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Map embed */}
          <div
            className="md:col-span-2 overflow-hidden"
            style={{
              borderRadius: 4,
              border: '1px solid rgba(201,168,76,0.35)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              height: 340,
            }}
          >
            <iframe
              title="Quinta Fermina Eventos — Ubicación"
              src="https://maps.google.com/maps?q=-32.9987611,-68.8530765&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'saturate(0.75)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info card */}
          <div
            className="flex flex-col justify-between p-7 backdrop-blur-md"
            style={{
              border: '1px solid rgba(201,168,76,0.35)',
              background: 'rgba(249, 247, 242, 0.95)',
              borderRadius: 4,
            }}
          >
            <div className="space-y-6">
              <InfoRow icon={<img src="/ubicacion.png" alt="" width={24} height={24} />} label="Dirección">
                Quinta Fermina Eventos
                <br />
                Mendoza, Argentina
              </InfoRow>
              <InfoRow icon={<img src="/reloj-de-pared.png" alt="" width={24} height={24} />} label="Horario">
                Baile y Fiesta:
                <br />
                00:00 am a 5:00 am
              </InfoRow>
              <InfoRow icon={<img src="/calendario.png" alt="" width={24} height={24} />} label="Fecha">
                Viernes, 9 de Octubre
                <br />
                2026
              </InfoRow>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="https://maps.app.goo.gl/KxrKCkjbHQnPdPzh7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-[0.18em] transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #b8902e 0%, #e8c96a 50%, #b8902e 100%)',
                  color: '#0a0f2e',
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: '0 6px 24px rgba(201,168,76,0.25)',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="text-lg mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p
          className="text-xs uppercase tracking-[0.2em] mb-1"
          style={{ color: '#c9a84c', fontFamily: "'Raleway', sans-serif", fontWeight: 600 }}
        >
          {label}
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: '#1B3A6B', fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
        >
          {children}
        </p>
      </div>
    </div>
  )
}
