import AuthUI from '../components/AuthUI/AuthUI';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import Image from 'next/image';
import React from 'react';

/**
 * The login page that houses the AuthUI component. Users can create an account and are then pathed to the landing page or business home respectively.
 */
export default function Login() {
  const router = useRouter();
  const { profile } = useProfile();

  useEffect(() => {
    if (profile?.user_type === 'consumer') {
      router.push('/');
    } else if (profile?.user_type === 'business') {
      router.push('/businesshome');
    } else if (profile?.user_type === '') {
      router.push('/usertype');
    }
  }, [profile]);

  return (
    <div className='flex w-full h-screen justify-center items-center bg-slate-800'>
      <div className='flex flex-col justify-around h-4/6 items-center'>
        <Image src='/logo.svg' alt='logo' width='400' height='400' />
        <AuthUI />
      </div>
    </div>
  );
}
