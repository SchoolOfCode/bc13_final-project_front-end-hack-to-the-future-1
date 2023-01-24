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
