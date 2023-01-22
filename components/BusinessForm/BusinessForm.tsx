import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useBusiness } from "../../hooks/useBusiness";
import Positioner from "../Positioner";
import Button from "../Button/Button";

export default function BusinessForm() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { business } = useBusiness();

  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    business_type: "",
    website: "",
    address_line1: "",
    postcode: "",
    lat: 0,
    lon: 0,
    user_id: user?.id,
  });

  // State to hold Lat/Long which is updated on click event of 'Set Position' button.
  const [latLon, setLatLon] = useState<[number, number]>();

  /**
   * If the user already has set up a business, the existing business information will be added to the form input fields.
   */
  useEffect(() => {
    if (business) {
      setBusinessInfo({
        name: business.name,
        business_type: business.business_type,
        website: business.website,
        address_line1: business.address_line1,
        postcode: business.postcode,
        lat: business.lat,
        lon: business.lon,
        user_id: business.user_id,
      });
      setLatLon([business.lat, business.lon]);
    }
  }, [business]);

  const redirectToRoot = () => {
    if (business) {
      router.push("/businesshome");
    } else {
      router.push("/usertype");
    }
  };

  const handleChange = (event: any) => {
    setBusinessInfo({
      ...businessInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (business && user) {
      const { data, error } = await supabase
        .from("businesses")
        .update(businessInfo)
        .eq("id", business.id)
        .select()
        .single();
    } else if (user) {
      const { data } = await supabase
        .from("businesses")
        .insert(businessInfo)
        .select()
        .single();
      const { error } = await supabase
        .from("profiles")
        .update({
          business_id: data.id,
        })
        .select()
        .single();
    }
    router.push("/businesshome");
  };

  const positionFinder = async (event: any) => {
    event.preventDefault();
    if (businessInfo.postcode) {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${businessInfo.postcode}`
      );
      const data = await response.json();
      setLatLon([data.result.latitude, data.result.longitude]);
    }
  };

  const updateBusinessPosition = (newLatLon: any) => {
    setBusinessInfo({ ...businessInfo, lat: newLatLon[0], lon: newLatLon[1] });
    setLatLon(newLatLon);
  };

  return (
    <div className="h-full w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start gap-4 items-center text-center h-full w-full max-w-md bg-slate-800 pt-10 pb-2"
      >
        <label
          htmlFor="name"
          className="font-Open text-sm text-amber-500 font-bold w-full text-left"
        >
          Business Name
        </label>
        <input
          className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2"
          type="text"
          name="name"
          placeholder="Name"
          value={businessInfo.name}
          onChange={handleChange}
        />

        <label
          htmlFor="business-type"
          className="font-Open text-sm text-amber-500 font-bold w-full text-left"
        >
          Business Type
        </label>
        <select
          className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2"
          name="business-type"
          placeholder="Business Type"
          value={businessInfo.business_type}
          onChange={handleChange}
        >
          <option>Food/Drink</option>
          <option>Entertainment</option>
          <option>Retail</option>
        </select>

        <label
          htmlFor="website"
          className="font-Open text-sm font-bold text-amber-500 w-full text-left"
        >
          Website
        </label>
        <input
          className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2"
          type="text"
          name="website"
          placeholder="Website"
          value={businessInfo.website}
          onChange={handleChange}
        />

        <label
          htmlFor="address-line1"
          className="font-Open text-sm font-bold text-amber-500 w-full text-left"
        >
          Address Line 1
        </label>
        <input
          className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600  border-2 rounded-md font-Open text-sm px-2"
          type="text"
          name="address-line1"
          placeholder="Address Line 1"
          value={businessInfo.address_line1}
          onChange={handleChange}
        />

        <label
          htmlFor="postcode"
          className="font-Open text-sm font-bold text-amber-500 w-full text-left"
        >
          Postcode
        </label>
        <input
          className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600  border-2 rounded-md font-Open text-sm px-2"
          name="postcode"
          type="text"
          placeholder="Postcode"
          value={businessInfo.postcode}
          onChange={handleChange}
        />
        <Button
          onClick={positionFinder}
          buttonText="Set Location"
          className="border-indigo-400 bg-opacity-0 text-indigo-400 "
        />

        <div className="flex justify-center items-center h-full w-full">
          <Positioner
            latLon={latLon}
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
            onClick={handleSubmit}
            buttonText="SAVE CHANGES"
            className="border-indigo-400"
          />
        </div>
      </form>
    </div>
  );
}
