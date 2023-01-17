import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import Icons from "../Icons"; //<-- Exploring the possibilites of using tailwind to style the users icon.
import { Database } from "../../types/supabase";
import Carousel from "../Carousel/Carousel";
import "leaflet/dist/leaflet.css";


export default function Positioner() {
  //Add a state to contain the latitude and logitude of each business
  const [locations, setLocations] = useState<Location[]>([]);

  
  /*Hardcoded user location data until it's possible to pull from capacitor */
  const userLat: number = 53.367513;
  const userLng: number = -1.501612;

  // Custom icon for users position
  // iconUrl: '../Icons.tsx', <-- Exploring the possibilites of using tailwind to style the users icon.
  let userIcon = L.icon({
    iconUrl: "https://cdn.onlinewebfonts.com/svg/img_155117.png",
    iconSize: [25, 25],
  });

  return (
    <MapContainer
      className="h-60 w-full"
      // style={{ height: 80, width: 300 }}
      center={[userLat, userLng]}
      zoom={20}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Marker below is the users position with custom icon */}
      <div>
        <Marker icon={userIcon} position={[userLat, userLng]}>
          <Popup>You are here!</Popup>
        </Marker>
      </div>
      
    </MapContainer>
  );
}
