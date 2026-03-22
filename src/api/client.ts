import { Restaurant, Review, User } from '../types'
import { SEED_RESTAURANTS, SEED_REVIEWS, SEED_USERS } from '../data/seedData'

// localStorage-backed data store (works on GitHub Pages — no server needed)

function load<T>(key: string, seed: T[]): T[] {
  const stored = localStorage.getItem(key)
  if (stored) return JSON.parse(stored)
  localStorage.setItem(key, JSON.stringify(seed))
  return seed
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data))
}

function nextId<T extends { id: number }>(items: T[]): number {
  return items.length === 0 ? 1 : Math.max(...items.map((i) => i.id)) + 1
}

// Restaurants
export const getRestaurants = async (): Promise<Restaurant[]> =>
  load('af_restaurants', SEED_RESTAURANTS)

export const getRestaurant = async (id: number): Promise<Restaurant> => {
  const all = load<Restaurant>('af_restaurants', SEED_RESTAURANTS)
  const found = all.find((r) => r.id === id)
  if (!found) throw new Error('Not found')
  return found
}

export const createRestaurant = async (
  data: Omit<Restaurant, 'id'>
): Promise<Restaurant> => {
  const all = load<Restaurant>('af_restaurants', SEED_RESTAURANTS)
  const restaurant: Restaurant = { ...data, id: nextId(all) }
  all.push(restaurant)
  save('af_restaurants', all)
  return restaurant
}

// Reviews
export const getReviews = async (restaurantId: number): Promise<Review[]> => {
  const all = load<Review>('af_reviews', SEED_REVIEWS)
  return all.filter((r) => r.restaurantId === restaurantId)
}

export const getAllReviews = async (): Promise<Review[]> =>
  load('af_reviews', SEED_REVIEWS)

export const createReview = async (
  data: Omit<Review, 'id'>
): Promise<Review> => {
  const all = load<Review>('af_reviews', SEED_REVIEWS)
  const review: Review = { ...data, id: nextId(all) }
  all.push(review)
  save('af_reviews', all)
  return review
}

// Users
export const getUsers = async (): Promise<User[]> =>
  load('af_users', SEED_USERS)

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const all = load<User>('af_users', SEED_USERS)
  return all.find((u) => u.email === email) || null
}

export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
  const all = load<User>('af_users', SEED_USERS)
  const user: User = { ...data, id: nextId(all) }
  all.push(user)
  save('af_users', all)
  return user
}
