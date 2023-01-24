import { useEffect, useState } from "react";

//Type for pos state
export interface position {
  lat: number;
  lng: number;
}

export function useLocation() {
  const [pos, setPos] = useState<position>(); //Position info
  const [err, setErr] = useState<string>(); //Error info

  useEffect(() => {
    //Checks if geolocal is possible on this device(internet connection/browser), either console logs or calls functions with position data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    //Recives lat & lng from geolocal and assigns to state.
    async function setPosition(position: any) {
      setPos({ lat: position.coords.latitude, lng: position.coords.longitude });
    }

    //Sets specific error if applicable, defaults to unknown error otherwise
    async function showError(error: any) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setErr("User denied the request for Geolocation.");
          console.log(err);
          break;
        case error.POSITION_UNAVAILABLE:
          setErr("Location information is unavailable.");
          console.log(err);
          break;
        case error.TIMEOUT:
          setErr("The request to get user location timed out.");
          console.log(err);
          break;
        case error.UNKNOWN_ERROR:
          setErr("An unknown error occurred.");
          console.log(err);
          break;
        default:
          setErr("An unknown error occurred.");
          console.log(err);
      }
    }
  }, [err]);
  return { pos, err };
}
