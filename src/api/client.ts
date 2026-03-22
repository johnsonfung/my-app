import { Restaurant, Review, User } from '../types'

const BASE = '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

// Restaurants
export const getRestaurants = () => request<Restaurant[]>('/restaurants')

export const getRestaurant = (id: number) =>
  request<Restaurant>(`/restaurants/${id}`)

export const createRestaurant = (data: Omit<Restaurant, 'id'>) =>
  request<Restaurant>('/restaurants', {
    method: 'POST',
    body: JSON.stringify(data),
  })

// Reviews
export const getReviews = (restaurantId: number) =>
  request<Review[]>(`/reviews?restaurantId=${restaurantId}`)

export const createReview = (data: Omit<Review, 'id'>) =>
  request<Review>('/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  })

// Users (simple mock auth)
export const getUsers = () => request<User[]>('/users')

export const getUserByEmail = async (email: string) => {
  const users = await request<User[]>(`/users?email=${email}`)
  return users[0] || null
}

export const createUser = (data: Omit<User, 'id'>) =>
  request<User>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  })
