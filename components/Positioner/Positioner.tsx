import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "leaflet/dist/leaflet.css";

export default function Positioner({ latlong }: any) {
  console.log(latlong);
  const center = {
    lat: 53.367513,
    lng: -1.501612,
  };

  let userIcon = L.icon({
    iconUrl: "https://cdn.onlinewebfonts.com/svg/img_155117.png",
    iconSize: [25, 25],
  });

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);

    useEffect(() => {
      if (latlong) {
        setPosition(latlong);
      }
    }, [latlong]);

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={userIcon}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Tap and then drag the icon to change business location"}
          </span>
        </Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      className="h-80 w-full"
      center={center}
      zoom={20}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div>
        <DraggableMarker />
      </div>
    </MapContainer>
  );
}
