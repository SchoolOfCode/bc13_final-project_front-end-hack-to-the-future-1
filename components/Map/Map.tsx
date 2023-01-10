import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

export default function Map() {
  return (
    <MapContainer
      className="h-screen w-screen"
      center={[53.367513, -1.501612]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[53.367513, -1.501612]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
