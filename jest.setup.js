// jest.setup.js
import "@testing-library/jest-dom/extend-expect";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;


export const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
