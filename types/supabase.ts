export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          city: string | null
          county: string | null
          id: string
          post_code: string | null
          street_number: number | null
          unit_number: number | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          county?: string | null
          id?: string
          post_code?: string | null
          street_number?: number | null
          unit_number?: number | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          county?: string | null
          id?: string
          post_code?: string | null
          street_number?: number | null
          unit_number?: number | null
        }
      }
      businesses: {
        Row: {
          address_id: string | null
          address_line1: string | null
          business_type: string | null
          created_at: string | null
          id: string
          lat: number | null
          lon: number | null
          name: string | null
          postcode: string | null
          website: string | null
        }
        Insert: {
          address_id?: string | null
          address_line1?: string | null
          business_type?: string | null
          created_at?: string | null
          id?: string
          lat?: number | null
          lon?: number | null
          name?: string | null
          postcode?: string | null
          website?: string | null
        }
        Update: {
          address_id?: string | null
          address_line1?: string | null
          business_type?: string | null
          created_at?: string | null
          id?: string
          lat?: number | null
          lon?: number | null
          name?: string | null
          postcode?: string | null
          website?: string | null
        }
      }
      consumers: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
      }
      deals: {
        Row: {
          business_id: string | null
          created_at: string | null
          expiration_time: string | null
          id: string
          name: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          expiration_time?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          expiration_time?: string | null
          id?: string
          name?: string | null
        }
      }
      profiles: {
        Row: {
          business_id: string | null
          consumer_id: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          business_id?: string | null
          consumer_id?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          business_id?: string | null
          consumer_id?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_type?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      test_example_table_exists: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
