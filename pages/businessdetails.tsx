import Button from "../components/Button/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { useBusiness } from "../hooks/useBusiness";
import BusinessForm from "../components/BusinessForm/BusinessForm";
import React from "react";
export default function BusinessDetails() {
  const { profile } = useProfile();
  const { business, loading } = useBusiness();

  const router = useRouter();

  const [pageGreeting, setPageGreeting] = useState("");

  useEffect(() => {
    if (!loading && business) {
      setPageGreeting(
        `Any changes made will immediately be visible to customers after you press Save Changes.`
      );
    } else if (!loading && !business) {
      setPageGreeting(
        "Thank you for registering your business on IndyGo! We just need a few more details from you so that we can display your business to customers."
      );
    } else setPageGreeting("");
  }, [business, loading]);

  /**
   * Route the user back to the user type selection page if they don't have a user type.
   */
  useEffect(() => {
    if (profile?.user_type === "") {
      router.push("/usertype");
    } else if (profile?.user_type === "consumer") {
      router.push("/");
    }
  }, [profile]);

  const handleClick = async () => {
    router.push("/usersettings");
  };

  return (
    <div className="flex flex-col bg-slate-800 h-full w-full z-1">
      <div className="flex flex-col h-full w-full  justify-start items-center">
        <header className="flex justify-between items-center w-full border-box p-4 mt-5">
          <Image src="/logo.svg" alt="logo" width="100" height="100" />
          <Button onClick={handleClick} buttonText="USER SETTINGS" />
        </header>
        <div className="flex flex-col justify-start gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-800 py-10">
          <h1 className="font-Open font-bold text-xl text-slate-50">
            Edit Business Details
          </h1>
          <p className="font-Open text-sm text-slate-50">{pageGreeting}</p>
          <BusinessForm />
        </div>
      </div>
    </div>
  );
}

//latitude and get longitude 

// 'POINT(-73.94581 40.807475)'

// function convertToPoint (lat,long){
// const point = `POINT(${lat} ${long)}`
//return point
// 
