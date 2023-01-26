import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.awesome-markers';

export interface PositionerProps {
  latLon: any;
  updateBusinessPosition: ({ props }: any) => void;
}

/**
 * The positioner component is used on the business details page, where the business can set their location with a draggable marker.
 * @param latLon String - Provided by BusinessForm component
 * @param updateBusinessPosition Function - Combines the latitude and longitude as one variable to save in state. Provided by BusinessForm component
 * @returns
 */
export default function Positioner({
  latLon,
  updateBusinessPosition,
}: PositionerProps) {
  const center = {
    lat: 53.367513,
    lng: -1.501612,
  };

  useEffect(() => {
    L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
  }, []);

  let userIcon = L.AwesomeMarkers.icon({
    icon: 'shopping-bag',
    markerColor: 'blue',
  });

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
    const markerRef = useRef<any>(null);
    const map = useMap();

    useEffect(() => {
      if (latLon) {
        setPosition(latLon);
        map.panTo(latLon);
      }
    }, [latLon]);

    // This code handles events relating to the marker. Ie. When the marker has been dragged/repositioned.
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
            const markerLatLong = marker.getLatLng();
            console.log(marker);
            updateBusinessPosition([markerLatLong.lat, markerLatLong.lng]);
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
          <span onClick={toggleDraggable} className='text-slate-50'>
            {draggable
              ? 'Marker is draggable'
              : 'Tap This Popup Message To Be Able To Drag Your Business Icon Location Around The Map'}
          </span>
        </Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      className='h-80 w-full'
      center={center}
      zoom={20}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <div>
        <DraggableMarker />
      </div>
    </MapContainer>
  );
}
