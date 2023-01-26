import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet.awesome-markers";
import React, { useState, useEffect } from "react";
import { useLocation } from "../../hooks/useLocation";
import { useLocalBusinesses } from "../../hooks/useLocalBusinesses";
import BusinessIcon from "../BusinessIcon/BusinessIcon";

/**
 * This map component displays a map for users on the website's home page.
 * It gets a user's local businesses from the useLocalBusinesses hook, and maps through this array to render a marker for each business location.
 * @returns A React component
 */
export default function Map() {
  const [userLat, setUserLat] = useState<number>(52.598229);
  const [userLng, setUserLng] = useState<number>(-1.353992);
  const { pos } = useLocation();
  const { businesses } = useLocalBusinesses();

  useEffect(() => {
    L.AwesomeMarkers.Icon.prototype.options.prefix = "fa";
  }, []);

  function getBusinessMarkerIcon(businessType: string) {
    switch (businessType) {
      case "Food/Drink":
        return L.AwesomeMarkers.icon({
          icon: "coffee",
          markerColor: "red",
        });
      case "Retail":
        return L.AwesomeMarkers.icon({
          icon: "shopping-bag",
          markerColor: "purple",
        });
      case "Entertainment":
        return L.AwesomeMarkers.icon({
          icon: "star",
          markerColor: "orange",
        });
      default:
        return L.AwesomeMarkers.icon({
          icon: "coffee",
          markerColor: "red",
        });
    }
  }

  let userIcon = L.AwesomeMarkers.icon({
    icon: "user",
    markerColor: "blue",
  });

  function RecenterMap() {
    const map = useMap();
    useEffect(() => {
      if (pos?.lat) {
        map.flyTo([pos?.lat, pos?.lng], 17, {
          duration: 0.75,
        });
      }
    }, [pos]);
    return <p>Success</p>;
  }

  useEffect(() => {
    setUserLat(pos?.lat ? pos?.lat : 53.367459);
    setUserLng(pos?.lng ? pos?.lng : -1.501914);
  }, [pos]);

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
          <Marker
            key={business.id}
            position={[business.lat, business.lon]}
            icon={getBusinessMarkerIcon(business.business_type)}
          >
            <Popup minWidth={90}>
              <div className="bg-slate-700">
                <BusinessIcon businessType={business.business_type} />
                <div>
                  <span className="text-slate-50 text-lg">{business.name}</span>
                  <br />
                  <span className="text-slate-50">
                    {business.business_type}
                  </span>
                </div>
              </div>
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
          <Circle
            center={[userLat, userLng]}
            radius={500}
            color="black"
            opacity={0.1}
          />
          <Popup>
            <span className="text-slate-50">You are here!</span>
          </Popup>
        </Marker>
      </div>
    </MapContainer>
  );
}
