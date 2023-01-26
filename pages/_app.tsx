import "../styles/globals.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { DemoModeProvider } from "../contexts/demoMode";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <DemoModeProvider>
        <Component {...pageProps} />
      </DemoModeProvider>
    </SessionContextProvider>
  );
}
//routing logic should go here
