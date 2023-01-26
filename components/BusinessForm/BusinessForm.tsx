import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useBusiness } from '../../hooks/useBusiness';
import Positioner from '../Positioner';
import Button from '../Button/Button';

/**
 * The form component for use on the business details page, taking in the businesses name, type, website and address
 * @returns A React component
 */
export default function BusinessForm() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { business } = useBusiness();
  const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2} [0-9][A-Z]{2}$/;

  //This object state is updated as the user completes parts of the form by the handleChange function. The object will also be updated if information already exists for the user's business through a useEffect.
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    business_type: '',
    website: '',
    address_line1: '',
    postcode: '',
    lat: 0,
    lon: 0,
    user_id: user?.id,
  });

  //These are the options that will be selectable in the Business Type dropdown field.
  const options = [
    { value: 'Select type', label: 'Select your business type...' },
    { value: 'Food/Drink', label: 'Food/Drink' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Retail', label: 'Retail' },
  ];

  //State to hold Lat/Long which is updated on click event of 'Set Position' button.
  const [latLon, setLatLon] = useState<[number, number]>();
  const [formMessage, setFormMessage] = useState('');
  const [postCodeMessage, setPostCodeMessage] = useState('');
  const [postCodeMessageColor, setPostCodeMessageColor] = useState('');
  const [fieldColor, setFieldColor] = useState('bg-slate-300');
  const [nameWarning, setNameWarning] = useState('');

  //State to hold postcode error message if response "404" from fetch request to postcodes.io. Indicates invalid postcode.
  const [postCodeError, setPostCodeError] = useState('');

  //If the user already has set up a business, the existing business information will be added to the form input fields.
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

  useEffect(() => {
    if (businessInfo?.name.length > 30) {
      setFieldColor('bg-red-200');
      setNameWarning('All Business Names Need To Be Less Than 30 Characters');
    } else {
      setFieldColor('bg-slate-300');
      setNameWarning('');
    }
  }, [businessInfo]);

  useEffect(() => {
    if (businessInfo.postcode.length != 0) {
      if (postcodeRegex.test(businessInfo.postcode)) {
        setPostCodeMessage('Valid postcode');
        setPostCodeMessageColor('text-green-500');
      } else {
        setPostCodeMessage('Invalid postcode');
        setPostCodeMessageColor('text-red-500');
      }
    }
  }, [businessInfo.postcode]);

  const redirectToRoot = () => {
    if (business) {
      router.push('/businesshome');
    } else {
      router.push('/usertype');
    }
  };

  /**
   * Function that updates the business state with user inputted data
   * @param event
   */
  const handleChange = (event: any) => {
    setBusinessInfo({
      ...businessInfo,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Function that checks the user inputs and updates database
   * @param event
   */
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (
      businessInfo.name.length > 0 &&
      businessInfo.postcode.length > 0 &&
      businessInfo.lat != 0 &&
      businessInfo.lon != 0 &&
      postcodeRegex.test(businessInfo.postcode) &&
      businessInfo?.name.length < 30 &&
      businessInfo.business_type != 'Select type' &&
      businessInfo.business_type.length > 0
    ) {
      if (business && user) {
        const { data, error } = await supabase
          .from('businesses')
          .update(businessInfo)
          .eq('id', business.id)
          .select()
          .single();
      } else if (user) {
        const { data } = await supabase
          .from('businesses')
          .insert(businessInfo)
          .select()
          .single();
        const { error } = await supabase
          .from('profiles')
          .update({
            business_id: data.id,
          })
          .select()
          .single();
      }
      router.push('/businesshome');
    } else {
      setFormMessage(
        'Error With Form Submission: Please ensure all non-optional fields have been completed, and that you have set the location of your business.'
      );
    }
  };

  /**
   * Function to receive a latitude and longitude from an inputted postcode
   * @param event
   */
  const positionFinder = async (event: any) => {
    event.preventDefault();
    if (businessInfo.postcode) {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${businessInfo.postcode}`
      );
      const data = await response.json();
      if (data.status == '404') {
        setPostCodeError('Invalid PostCode, please re-enter');
      } else {
        setPostCodeError('');
        setLatLon([data.result.latitude, data.result.longitude]);
        setBusinessInfo({
          ...businessInfo,
          lat: data.result.latitude,
          lon: data.result.longitude,
        });
      }
    }
  };

  /**
   * Function that combines the latitude and longitude as one variable to save in state
   * @param newLatLon
   */
  const updateBusinessPosition = (newLatLon: any) => {
    setBusinessInfo({ ...businessInfo, lat: newLatLon[0], lon: newLatLon[1] });
    setLatLon(newLatLon);
  };

  return (
    <div className='h-full w-full'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-start gap-4 items-center text-center h-full w-full max-w-md bg-slate-800 pt-10 pb-2'
      >
        <label
          htmlFor='name'
          className='font-Open text-sm text-amber-500 font-bold w-full text-left'
        >
          Business Name
        </label>
        <input
          className='w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2'
          type='text'
          name='name'
          placeholder='Name'
          value={businessInfo.name}
          onChange={handleChange}
        />
        <p className='text-red-600'>{nameWarning}</p>

        <label
          htmlFor='business_type'
          className='font-Open text-sm text-amber-500 font-bold w-full text-left'
        >
          Business Type
        </label>
        <select
          name='business_type'
          value={businessInfo.business_type}
          className='w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2 md:mx-full md:my-full focus:ring-indigo-400 focus:ring-4'
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label
          htmlFor='website'
          className='font-Open text-sm font-bold text-amber-500 w-full text-left'
        >
          Website <span className='text-xs italic'>(Optional)</span>
        </label>
        <input
          className='w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2'
          type='text'
          name='website'
          placeholder='Website'
          value={businessInfo.website}
          onChange={handleChange}
        />

        <label
          htmlFor='address_line1'
          className='font-Open text-sm font-bold text-amber-500 w-full text-left'
        >
          Address Line 1 <span className='text-xs italic'>(Optional)</span>
        </label>
        <input
          className='w-full h-14 bg-slate-300 text-slate-800 border-amber-600  border-2 rounded-md font-Open text-sm px-2'
          type='text'
          name='address_line1'
          placeholder='Address Line 1'
          value={businessInfo.address_line1}
          onChange={handleChange}
        />

        <label
          htmlFor='postcode'
          className='font-Open text-sm font-bold text-amber-500 w-full text-left'
        >
          Postcode
        </label>
        <div className='flex w-full'>
          <input
            className='w-full h-14 bg-slate-300 text-slate-800 border-amber-600  border-2 rounded-md font-Open text-sm px-2'
            name='postcode'
            type='text'
            placeholder='Postcode'
            value={businessInfo.postcode}
            onChange={handleChange}
          />
          <Button
            onClick={positionFinder}
            buttonText='SET LOCATION'
            className='h-full ml-5'
          />
        </div>
        <p className={postCodeMessageColor}>{postCodeMessage}</p>

        {postCodeError ? <p className='text-red-500'>{postCodeError}</p> : null}
        <p className='text-slate-50 text-sm px-5'>
          Pressing Set Location after entering your postcode will place an
          estimated position for your business on the map below.
        </p>
        <p className='text-slate-50 text-sm px-5'>
          You can then specify your business&#39;s exact location by dragging
          the marker around on the map.
        </p>
        <div className='flex justify-center items-center h-full w-full'>
          <Positioner
            latLon={latLon}
            updateBusinessPosition={updateBusinessPosition}
          />
        </div>
        <p className='text-red-600'>{formMessage}</p>
        <div className='flex justify-between gap-4'>
          <Button
            onClick={redirectToRoot}
            buttonText='BACK'
            className='border-indigo-400 bg-opacity-0 text-indigo-400 '
          />
          <Button
            onClick={handleSubmit}
            buttonText='SAVE CHANGES'
            className='border-indigo-400'
          />
        </div>
      </form>
    </div>
  );
}
