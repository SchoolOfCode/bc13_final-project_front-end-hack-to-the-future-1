import Head from 'next/head';
import Image from 'next/image';
import Map from '../components/Map/';
import Button from '../components/Button/Button';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useProfile } from '../hooks/useProfile';
import React from 'react';
import { useEffect } from 'react';
import Carousel from '../components/Carousel/Carousel';

export default function Home() {
  const user = useUser();
  const { profile } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (profile?.user_type === 'business') {
      router.push('/businesshome');
    } else if (profile?.user_type === '') {
      router.push('/usertype');
    }
  }, [profile]);

  function redirectToSettings() {
    router.push('/usersettings');
  }

  function redirectToLogIn() {
    router.push('/login');
  }

  return (
    <>
      <Head>
        <title>IndyGo</title>
        <meta name='description' content='Support local businesses!' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://unpkg.com/leaflet@1.9.3/dist/leaflet.css'
          integrity='sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI='
          crossOrigin=''
        />
      </Head>
      <header className='flex justify-between items-center w-full z-10 absolute top-0  bg-slate-800  border-box p-4'>
        <Image
          src='/logo.svg'
          alt='logo'
          width='60'
          height='60'
          className='rounded-lg '
        />
        {user ? (<>
          <Button buttonText='SETTINGS' onClick={redirectToSettings} />
          <Button buttonText='DEMO' onClick={redirectToSettings} />
          </>
        ) : (
          <Button buttonText='LOG IN' onClick={redirectToLogIn} />
        )}
      </header>
      <main className='w-screen'>
        <div className='z-0'>
          <Map />
        </div>
        <div className='z-10 absolute bottom-1 w-screen h-60'>
          <Carousel />
        </div>
      </main>
    </>
  );
}
