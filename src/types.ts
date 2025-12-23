import { PHOTO_CATEGORIES, PHOTO_DIMENSIONS } from './lib/consts'

export type Photo = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export type PhotoDimensions =
  (typeof PHOTO_DIMENSIONS)[keyof typeof PHOTO_DIMENSIONS]

export type PhotoCategories = (typeof PHOTO_CATEGORIES)[number]
