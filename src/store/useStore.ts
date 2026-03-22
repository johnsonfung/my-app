import { create } from 'zustand'
import { Allergen, User } from '../types'

interface AppState {
  // Auth
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void

  // Filters
  selectedAllergens: Allergen[]
  toggleAllergen: (allergen: Allergen) => void
  clearFilters: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: 'rating' | 'newest'
  setSortBy: (sort: 'rating' | 'newest') => void
}

const savedUser = localStorage.getItem('user')

export const useStore = create<AppState>((set) => ({
  user: savedUser ? JSON.parse(savedUser) : null,
  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
    set({ user })
  },
  logout: () => {
    localStorage.removeItem('user')
    set({ user: null })
  },

  selectedAllergens: [],
  toggleAllergen: (allergen) =>
    set((state) => ({
      selectedAllergens: state.selectedAllergens.includes(allergen)
        ? state.selectedAllergens.filter((a) => a !== allergen)
        : [...state.selectedAllergens, allergen],
    })),
  clearFilters: () => set({ selectedAllergens: [], searchQuery: '' }),

  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  sortBy: 'newest',
  setSortBy: (sortBy) => set({ sortBy }),
}))
