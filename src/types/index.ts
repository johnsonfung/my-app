export type Allergen =
  | 'milk'
  | 'eggs'
  | 'fish'
  | 'shellfish'
  | 'tree_nuts'
  | 'peanuts'
  | 'wheat'
  | 'soy'
  | 'sesame'

export interface User {
  id: number
  name: string
  email: string
  password: string
  allergenProfile: Allergen[]
}

export interface Restaurant {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  website: string
  description: string
  allergenFree: Allergen[]
  submittedBy: number
  createdAt: string
}

export interface Review {
  id: number
  restaurantId: number
  userId: number
  userName: string
  rating: number
  comment: string
  createdAt: string
}
