export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          "originalPrice": number | null
          category: string
          "inStock": boolean
          rating: number
          reviews: number
          image: string
          "created_at": string | null
        }
        Insert: {
          id?: number
          name: string
          description: string
          price: number
          "originalPrice": number | null
          category: string
          "inStock": boolean
          rating: number
          reviews: number
          image: string
          "created_at": string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string
          price?: number
          "originalPrice": number | null
          category?: string
          "inStock": boolean
          rating?: number
          reviews?: number
          image?: string
          "created_at": string | null
        }
        Relationships: []
      },
      customers: {
        Row: {
          id: string // uuid
          email: string
          password_hash: string | null
          first_name: string | null
          last_name: string | null
          phone: string | null
          date_of_birth: string | null // date
          gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
          is_active: boolean | null
          email_verified: boolean | null
          accepts_marketing: boolean | null
          created_at: string | null // timestamptz
          updated_at: string | null // timestamptz
        }
        Insert: {
          id?: string
          email: string
          password_hash?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
          is_active?: boolean | null
          email_verified?: boolean | null
          accepts_marketing?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
          is_active?: boolean | null
          email_verified?: boolean | null
          accepts_marketing?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
