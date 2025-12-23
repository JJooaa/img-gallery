// The photo dimensions for static.photos API.
export const PHOTO_DIMENSIONS = {
  200: {
    x: 200,
    y: 200,
  },
  320: {
    x: 320,
    y: 240,
  },
  640: {
    x: 640,
    y: 360,
  },
  1024: {
    x: 1024,
    y: 576,
  },
  1200: {
    x: 1200,
    y: 630,
  },
} as const

// Allow users to selected from 4 different page limits
export const PAGE_LIMITS = [8, 12, 16, 20] as const

// Allow users to select categories
export const PHOTO_CATEGORIES = [
  'nature',
  'office',
  'people',
  'technology',
  'cityscape',
  'workspace',
  'food',
  'travel',
  'gaming',
] as const
