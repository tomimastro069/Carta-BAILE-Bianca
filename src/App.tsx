import PageEdges from './components/PageEdges'
import InvitationCard from './components/InvitationCard'
import GuestList from './components/GuestList'

export default function App() {
  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        backgroundColor: '#f9f7f2',
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      {/* Fondo floral identico al sitio original */}
      <PageEdges />

      {/* Contenido simplificado: Tarjeta + Confirmacion + Lista de invitados */}
      <div className="relative py-12 px-4 flex flex-col gap-12" style={{ zIndex: 1 }}>
        <section className="flex items-center justify-center">
          <InvitationCard />
        </section>

        <GuestList />
      </div>
    </div>
  )
}
