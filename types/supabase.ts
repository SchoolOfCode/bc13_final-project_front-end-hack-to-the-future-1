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
      businesses: {
        Row: {
          address_line1: string | null
          business_type: string | null
          created_at: string | null
          id: string
          lat: number | null
          lon: number | null
          name: string | null
          postcode: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          address_line1?: string | null
          business_type?: string | null
          created_at?: string | null
          id?: string
          lat?: number | null
          lon?: number | null
          name?: string | null
          postcode?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          address_line1?: string | null
          business_type?: string | null
          created_at?: string | null
          id?: string
          lat?: number | null
          lon?: number | null
          name?: string | null
          postcode?: string | null
          user_id?: string | null
          website?: string | null
        }
      }
      deals: {
        Row: {
          business_id: string | null
          created_at: string | null
          expiration_time: string | null
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          expiration_time?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          expiration_time?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          business_id: string | null
          full_name: string | null
          id: string
          user_type: string | null
        }
        Insert: {
          business_id?: string | null
          full_name?: string | null
          id: string
          user_type?: string | null
        }
        Update: {
          business_id?: string | null
          full_name?: string | null
          id?: string
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
