import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Map from "../components/Map/";
import Carousel from "../components/Carousel/Carousel";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      <header>
        <h1 className="z-10 absolute top-0 right-0">IndyGo</h1>
      </header>
      <main className="w-screen">
        <div className="z-0">
          <Map />
        </div>
        <div className="z-10 absolute bottom-5 w-screen">
          <Carousel />
        </div>
      </main>
    </>
  );
}
