export interface PostcodesFetch {
  status: number;
  result: Result;
  mappedPostcodes: string[];
}

export interface Result {
  postcode: string;
  quality: number;
  eastings: number;
  northings: number;
  country: string;
  nhs_ha: string;
  longitude: number;
  latitude: number;
  european_electoral_region: string;
  primary_care_trust: string;
  region: string;
  lsoa: string;
  msoa: string;
  incode: string;
  outcode: string;
  parliamentary_constituency: string;
  admin_district: string;
  parish: string;
  admin_county: null;
  date_of_introduction: string;
  admin_ward: string;
  ced: null;
  ccg: string;
  nuts: string;
  pfa: string;
  codes: Codes;
  distance: number;
}

export interface Codes {
  admin_district: string;
  admin_county: string;
  admin_ward: string;
  parish: string;
  parliamentary_constituency: string;
  ccg: string;
  ccg_id: string;
  ced: string;
  nuts: string;
  lsoa: string;
  msoa: string;
  lau2: string;
  pfa: string;
}

export interface Business {
  id: string;
  name: string;
  business_type: string | null;
  website: string | null;
  user_id: string | null;
  deals: Deal[];
  created_at: string | null;
  lat: number | null;
  lon: number | null;
  address_line1: string | null;
  postcode: string | null;
}

export interface Deal {
  id: string;
  name: string;
  created_at: string | null;
  expiration_time: string;
  business_id: string;
  user_id: string;
}
