import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Button from "../components/Button/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useBusiness } from "../hooks/useBusiness";
import { useProfile } from "../hooks/useProfile";
import Positioner from "../components/Positioner";

export default function BusinessDetails() {
  const { business } = useBusiness();
  const { profile } = useProfile();

  const router = useRouter();
  const supabase = useSupabaseClient();

  const [name, setName] = useState<string>();
  const [nameWarning, setNameWarning] = useState<string>();
  const [nameWarningColour, setNameWarningColour] = useState<string>(
    "text-red-600 text-xs"
  );

  const [website, setWebsite] = useState<string>();
  const [websiteWarning, setWebsiteWarning] = useState<string>();
  const [websiteWarningColour, setWebsiteWarningColour] = useState<string>(
    "text-red-600 text-xs"
  );

  // State to hold new postcode field.
  const [postcode, setPostcode] = useState<string>();
  const [postcodeWarning, setPostcodeWarning] = useState<string>();
  const [postcodeWarningColour, setPostcodeWarningColour] = useState<string>(
    "text-red-600 text-xs"
  );

  // State to hold Lat/Long which is updated on click event of 'Set Position' button.
  const [latlong, setLatlong] = useState<[number, number]>();
  const [businessPosition, setBusinessPosition] = useState<any>();

  const updateBusinessPosition = (newLatLong : any) => {
    setBusinessPosition(newLatLong);
    console.log(newLatLong);
  };

  useEffect(() => {
    if (business) {
      setName(business.name);
      setWebsite(business.website);
      setPostcode(business.postcode);
    }
  }, [business]);

  /**
   * Route the user back to the user type selection page if they don't have a user type.
   */
  useEffect(() => {
    if (profile?.user_type === "") {
      router.push("/usertype");
    }
  }, [profile]);

  const saveChanges = async () => {
    if (business) {
      const { data, error } = await supabase
        .from("businesses")
        .update({ name: name, website: website, postcode: postcode, lat: businessPosition[0], lon: businessPosition[1] })
        .eq("id", business.id)
        .select();
    } else {
      const { data, error } = await supabase
        .from("businesses")
        .insert({ name: name, website: website, postcode: postcode, lat: businessPosition[0], lon: businessPosition[1] })
        .select();
      if (data && profile) {
        const { error } = await supabase
          .from("profiles")
          .update({ business_id: data[0].id })
          .eq("id", profile.id)
          .select();
      }
    }
  };

  const handleClick = async () => {
    router.push("/usersettings");
  };

  const redirectToRoot = () => {
    router.push("/");
  };

  const positionFinder = async () => {
    if (postcode) {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      const data = await response.json();
      console.log(`Postcode Position:`,data.result.latitude, data.result.longitude);
      setLatlong([data.result.latitude, data.result.longitude]);
    }
  };

  return (
    <div className="flex flex-col bg-slate-800 h-full w-full z-1">
      {!profile ? (
        <p>Redirecting...</p>
      ) : (
        <div className="flex flex-col h-full w-full  justify-start items-center">
          <header className="flex justify-between items-center w-full border-box p-4 mt-5">
            <Image src="/logo.svg" alt="logo" width="100" height="100" />
            <Button onClick={handleClick} buttonText="USER SETTINGS" />
          </header>
          <div className="flex flex-col justify-start gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-800 py-10">
            <h1 className="font-Open font-bold text-xl text-slate-50">
              Edit Business Details
            </h1>
            <p className="font-Open text-sm text-slate-50">
              Conditional Text Content Goes Here
            </p>
            <form className="flex flex-col justify-start gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-800 pt-10 pb-2">
              <label
                htmlFor="name"
                className="font-Open text-sm text-amber-500 font-bold w-full text-left"
              >
                Business Name
              </label>
              <input
                className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <p className={nameWarningColour}>{nameWarning}</p>

              <label
                htmlFor="website"
                className="font-Open text-sm font-bold text-amber-500 w-full text-left"
              >
                Website
              </label>
              <input
                className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600  border-2 rounded-md font-Open text-sm px-2"
                id="website"
                name="website"
                value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
              />
              <p className={websiteWarningColour}>{websiteWarning}</p>
              <label
                htmlFor="postcode"
                className="font-Open text-sm font-bold text-amber-500 w-full text-left"
              >
                Postcode
              </label>
              <input
                className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600  border-2 rounded-md font-Open text-sm px-2"
                id="postcode"
                name="postcode"
                value={postcode}
                onChange={(e) => {
                  setPostcode(e.target.value);
                }}
              />
              <p className={postcodeWarningColour}>{postcodeWarning}</p>
            </form>
            <Button
              onClick={positionFinder}
              buttonText="Set Location"
              className="border-indigo-400 bg-opacity-0 text-indigo-400 "
            />
            <div className="flex justify-center items-center h-full w-full">
              <Positioner
                latlong={latlong}
                updateBusinessPosition={updateBusinessPosition}
              />
            </div>
            <div className="flex justify-between gap-4">
              <Button
                onClick={redirectToRoot}
                buttonText="BACK"
                className="border-indigo-400 bg-opacity-0 text-indigo-400 "
              />
              <Button
                onClick={saveChanges}
                buttonText="SAVE CHANGES"
                className="border-indigo-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
