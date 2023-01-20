import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent,
} from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabase';
import Icons from '../Icons'; //<-- Exploring the possibilites of using tailwind to style the users icon.
import { Database } from '../../types/supabase';
import Carousel from '../Carousel/Carousel';
import React from 'react';
import { useLocation } from '../../hooks/useLocation';

{
  /* REF:LOCATIONINTERFACEv1. This code describes the interface for Location which matches the data types of the 'Businesses' table in Supabase database. */
}

export interface Location {
  business_type: string;
  lat: number;
  lon: number;
  name: string;
  business_id: string;
}

{
  /* REF:MAPv2. This code makes a fetch request to Supabase database. It returns all data from the 'Businesses' table. The response is mapped and each item is stored in the 'businessLocations' state. */
}

export default function Map() {
  //Add a state to contain the latitude and logitude of each business
  const [businessLocations, setbusinessLocations] = useState<Location[]>([]);
  const [userLat, setUserLat] = useState<number>(52.598229);
  const [userLng, setUserLng] = useState<number>(-1.353992);
  const { pos } = useLocation();

  function RecenterMap() {
    const map = useMap()
      useEffect(() => {
        if (pos?.lat) {
          map.flyTo([pos?.lat, pos?.lng],16);
        }
        const bounds = map.getBounds()
        console.log(bounds)
      }, [pos]);}

  useEffect(() => {
    async function getbusinessLocations() {
      const { data } = await supabase.from('businesses').select();

      const businessLocationsData: any = data
        ? data.map((item) => ({
            lat: item.lat,
            lon: item.lon,
            name: item.name,
            business_type: item.business_type,
            business_id: item.id,
          }))
        : console.log('No data found');
      setbusinessLocations(businessLocationsData);
      console.log(
        'Type of businessLocationsData',
        typeof businessLocationsData
      );
    }
    getbusinessLocations();
  }, []);

  {
    /* REF:MAPv1. This code makes a fetch request to the Supabase database. It returns all data from the 'Businesses' table. It stores lat and lon from a single row (data[0].lat & data[0].lon) in two pieces of state ('latitude' & 'longitude'). This code is superceded by REF:MAPv2 */
  }

  //const [latitude, setLatitude] = useState<any | null>(["empty"]);
  //const [longitude, setLongitude] = useState<any | null>(["empty"]);

  // useEffect(() => {
  //   async function getLocation() {
  //     const { data, error } = await supabase
  //       .from('businesses')
  //       .select();
  //       console.log(data, data[0].lat, data[0].lon)
  //       setLatitude(data);
  //       setLongitude(data);
  //     }
  //   type LocationResponse = Awaited<ReturnType<typeof getLocation>>;
  //   //type LocationResponseSuccess = LocationResponse['data'];
  //   //type LocationResponseError = LocationResponse['error'];
  //   getLocation();
  // }, []);

  /*Hardcoded user location data until it's possible to pull from capacitor */
  useEffect(() => {
    setUserLat(pos?.lat ? pos?.lat : 52.598229);
    setUserLng(pos?.lng ? pos?.lng : -1.353992);
  }, [pos]);

  // Custom icon for users position
  // iconUrl: '../Icons.tsx', <-- Exploring the possibilites of using tailwind to style the users icon.
  let userIcon = L.icon({
    iconUrl: 'https://cdn.onlinewebfonts.com/svg/img_155117.png',
    iconSize: [25, 25],
  });

  return (
    <MapContainer
      className='h-screen w-screen'
      center={[userLat, userLng]}
      zoom={5}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <RecenterMap />
      {/* REF:MARKERv2. This code is rendering a list of markers on a map, where each marker corresponds to a location in the businessLocations array which is stored as state. */}
      <div>
        {businessLocations.map((location, i) => (
          <Marker key={i} position={[location.lat, location.lon]}>
            <Popup>
              {location.name} <br /> {location.business_type}
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
      {/* REF: MARKERv1.This code is the first iteration. It renders a single marker on a map. The lat and lon values correspond with the response object of a fetch request that returned a single row (data[0].lat & data[0].lon – which were both stored as states: latitude & longitude). This has been superceded by code REF:MARKERv2 */}
      {/* <Marker position={[lat, lon]}>
        <Popup>
        Popup info <br /> Easily customizable.
        </Popup>
      </Marker> */}
      {/* <div className='z-10 absolute bottom-5 w-screen'>
        <Carousel businessData={businessLocations} />
      </div> */}
    </MapContainer>
  );
}
