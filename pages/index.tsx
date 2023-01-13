import Head from "next/head";
import Image from "next/image";
import Map from "../components/Map/";
import Button from "../components/Button/Button";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";


export default function Home() {
  const user = useUser();
  const router = useRouter();
  function redirectToSettings() {
    router.push("/usersettings");
  }
  function redirectToLogIn() {
    router.push("/login");
  }
  return (
    <>
      <Head>
        <title>IndyGo</title>
        <meta name="description" content="Support local businesses!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossOrigin=""
        />
      </Head>
      <header className="flex justify-between w-full z-10 absolute top-0 border-box p-4">
      <Image src="/logo.svg" alt="logo" width="59" height="59" />
        {user ? (
          <Button buttonText="Settings" onClick={redirectToSettings} />
        ) : (
          <Button buttonText="Log In" onClick={redirectToLogIn} />
        )}
      </header>

      <main>
        <div className="z-0">
          <Map />
        </div>
      </main>
    </>
  );
}
