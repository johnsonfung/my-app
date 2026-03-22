import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import { Restaurant } from '../../types'

// Fix default marker icons in Leaflet + Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

interface Props {
  restaurants: Restaurant[]
  center?: [number, number]
  zoom?: number
  className?: string
}

export default function MapView({
  restaurants,
  center = [45.5231, -122.6765],
  zoom = 12,
  className = 'h-[500px]',
}: Props) {
  return (
    <div className={className}>
      <MapContainer center={center} zoom={zoom} className="w-full h-full rounded-lg">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {restaurants.map((r) => (
          <Marker key={r.id} position={[r.lat, r.lng]}>
            <Popup>
              <div className="text-sm">
                <Link
                  to={`/restaurants/${r.id}`}
                  className="font-semibold text-primary-600 hover:underline"
                >
                  {r.name}
                </Link>
                <p className="text-gray-500 mt-1">{r.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
