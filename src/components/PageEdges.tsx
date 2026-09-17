import fullCardArt from '../imports/Invitación 15 años Floral Elegante Azul.png'

export default function PageEdges() {
  return (
    <img
      src={fullCardArt}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ objectFit: 'cover', objectPosition: 'top center' }}
    />
  )
}
