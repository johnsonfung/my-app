# AllergenFree - Restaurant Finder for People with Allergies

## Tech Stack
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS v3** for styling
- **React Router v6** for routing
- **Leaflet** (via `react-leaflet`) for map view
- **JSON Server** as mock REST API (db.json)
- **Zustand** for lightweight state management (auth + filters)

## Data Model

### Allergens (Big 9 - US FDA)
`milk | eggs | fish | shellfish | tree_nuts | peanuts | wheat | soy | sesame`

### `db.json` collections

```
users: { id, name, email, password (hashed), allergenProfile: string[] }
restaurants: { id, name, address, lat, lng, phone, website, description, allergenFree: string[], submittedBy: userId, createdAt }
reviews: { id, restaurantId, userId, rating (1-5), comment, createdAt }
```

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero + search bar + featured restaurants |
| `/restaurants` | Browse | List/grid + filter sidebar + map toggle |
| `/restaurants/:id` | Detail | Restaurant info, allergen badges, reviews, map pin |
| `/submit` | Submit | Form to add a new restaurant (auth required) |
| `/login` | Login | Login form |
| `/register` | Register | Registration form with allergen profile |
| `/profile` | Profile | User's submissions, reviews, allergen prefs |

## Key Components

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Nav bar with auth state
│   │   └── Footer.tsx
│   ├── restaurant/
│   │   ├── RestaurantCard.tsx   # Card for list/grid view
│   │   ├── RestaurantList.tsx   # Grid of cards
│   │   ├── RestaurantDetail.tsx # Full detail view
│   │   ├── RestaurantForm.tsx   # Submit/edit form
│   │   └── AllergenBadge.tsx   # Colored badge per allergen
│   ├── map/
│   │   └── MapView.tsx         # Leaflet map with markers
│   ├── review/
│   │   ├── ReviewList.tsx
│   │   ├── ReviewForm.tsx
│   │   └── StarRating.tsx
│   ├── filter/
│   │   └── AllergenFilter.tsx  # Checkbox filter for allergens
│   └── auth/
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       └── ProtectedRoute.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── BrowsePage.tsx
│   ├── RestaurantPage.tsx
│   ├── SubmitPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── ProfilePage.tsx
├── store/
│   └── useStore.ts            # Zustand store (auth + filters)
├── api/
│   └── client.ts              # Fetch wrapper for JSON Server
├── types/
│   └── index.ts               # TypeScript interfaces
├── data/
│   └── allergens.ts           # Allergen constants + labels + colors
├── App.tsx
└── main.tsx
```

## Implementation Steps

### Step 1: Project Setup
- Remove Gatsby files, init Vite React-TS project
- Install dependencies: tailwind, react-router, react-leaflet, zustand, json-server
- Configure Tailwind, set up base layout

### Step 2: Data Layer
- Create `db.json` with seed data (5-10 sample restaurants, 2 users, some reviews)
- Create TypeScript types (`User`, `Restaurant`, `Review`, `Allergen`)
- Create API client (`api/client.ts`) with CRUD helpers
- Create Zustand store for auth state and filter state

### Step 3: Layout & Navigation
- Header with nav links, auth buttons, and responsive mobile menu
- Footer
- React Router setup with all routes

### Step 4: Browse & Filter (core feature)
- Restaurant list/grid with cards showing name, allergen badges, rating
- AllergenFilter sidebar with checkboxes for Big 9
- Search by name
- Sort by rating / newest

### Step 5: Map View
- Leaflet map on Browse page (toggle between list and map)
- Markers for each restaurant with popup showing name + link
- Map on restaurant detail page showing single location

### Step 6: Restaurant Detail & Reviews
- Full restaurant info page with allergen badges
- Review list with star ratings
- Review submission form (auth required)

### Step 7: Submit Restaurant
- Form with fields: name, address, lat/lng, phone, website, description
- Allergen checkboxes (which allergens is this restaurant free of)
- Auth-gated via ProtectedRoute

### Step 8: Auth (simple mock)
- Login/Register forms
- Store user in Zustand + localStorage for persistence
- Allergen profile selection during registration
- Profile page showing user's submissions and reviews

### Step 9: Polish
- Responsive design (mobile-first)
- Loading states and error handling
- Empty states for no results
- Seed data that makes the app feel alive
