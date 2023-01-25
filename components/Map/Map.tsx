import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import React from "react";
import { useLocation } from "../../hooks/useLocation";
import { useLocalBusinesses } from "../../hooks/useLocalBusinesses";
import Button from "../Button/Button";
/**
 * This map component displays a map for users on the website's home page.
 * It gets a user's local businesses from the useLocalBusinesses hook, and maps through this array to render a marker for each business location.
 * @returns
 */
export default function Map() {
  const [userLat, setUserLat] = useState<number>(52.598229);
  const [userLng, setUserLng] = useState<number>(-1.353992);
 

  const { pos, demoMode } = useLocation();
  const { businesses } = useLocalBusinesses();

  function RecenterMap() {
    const map = useMap();
    useEffect(() => {
        if (pos?.lat) {
          map.flyTo([pos?.lat, pos?.lng], 16);
        }
      
    }, [pos]);
    return <p>Success</p>;
  }

  useEffect(() => {
    
    setUserLat(pos?.lat ? pos?.lat : 53.367459);
    setUserLng(pos?.lng ? pos?.lng : -1.501914);
    console.log("setting with Pos")
    
  }, [pos]);

  // Custom icon for users position
  // iconUrl: '../Icons.tsx', <-- Exploring the possibilites of using tailwind to style the users icon.
  let userIcon = L.icon({
    iconUrl: "https://cdn.onlinewebfonts.com/svg/img_155117.png",
    iconSize: [25, 25],
  });

  // function demoMode() {
  //   setDemoModeActive(!demoModeActive)
  //   console.log(demoModeActive)
  // }

  return (
    <MapContainer
      className="h-screen w-screen"
      center={[userLat, userLng]}
      zoom={5}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap />
      {/* REF:MARKERv2. This code is rendering a list of markers on a map, where each marker corresponds to a location in the businessLocations array which is stored as state. */}
      <div>
        {businesses.map((business: any) => (
          <Marker key={business.id} position={[business.lat, business.lon]}>
            <Popup>
              {business.name} <br /> {business.business_type}
            </Popup>
          </Marker>
        ))}
      </div>
      {/* Marker below is the users position with custom icon */}
      <div>
        <Marker
          icon={userIcon}
          position={[userLat ? userLat : 0, userLng ? userLng : 0]}
        >
          <Popup>You are here!</Popup>
        </Marker>
      </div>
      <Button
            className='absolute top-0 right-2 z-5'
            buttonText='DEMO'
            onClick={demoMode}
          />
    </MapContainer>
  );
}
