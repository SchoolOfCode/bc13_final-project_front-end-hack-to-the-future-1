import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";

export default function Map() {

  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)

// Struggling to type data and error on line 13.
// This function is a fetch request to retrive sample data from businesses table.

useEffect( () => {
  async function getLocation(){
    const {data, error} = await supabase.from('businesses').select(`lat, lon`)
    setLat(data[0].lat)
    setLon(data[0].lon)

  }
 
  type LocationResponse = Awaited<ReturnType<typeof getLocation>>
  type LocationResponseSuccess = LocationResponse['data']
  type LocationResponseError = LocationResponse['error']
  getLocation()
}, []);




  return (
    <MapContainer
      className="h-screen w-screen z-1"
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
