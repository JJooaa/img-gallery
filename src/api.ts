import { notFound } from '@tanstack/react-router'
import { PHOTO_DIMENSIONS } from './lib/consts'
import type { Photo, PhotoCategories, PhotoDimensions } from './types'

type FetchPhotoByIdOpts = {
  id: number
  category: PhotoCategories
  dimension?: PhotoDimensions
}

// Fetch a single photo by id
export async function fetchPhotoById({
  id,
  category,
  dimension = PHOTO_DIMENSIONS[1200],
}: FetchPhotoByIdOpts) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${id}`,
  )

  if (response.status === 404) throw notFound()
  if (!response.ok) throw new Error('Failed to fetch photo by ID.')

  const photoResult = (await response.json()) as Photo

  const photo: Photo = {
    ...photoResult,
    url: generateStaticPhotos({
      id,
      dimension,
      category,
    }),
  }

  return photo
}

type FetchPhotosOpts = {
  page: number
  limit: number
  category: PhotoCategories
  dimension?: PhotoDimensions
}

/**
 * Fetch photos by search params.
 * NOTE: jsonplaceholder expects search params prefixed with underscore.
 */
export async function fetchPhotos({
  page,
  limit,
  category,
  dimension = PHOTO_DIMENSIONS[200],
}: FetchPhotosOpts) {
  const searchParams = new URLSearchParams({
    _page: String(page),
    _limit: String(limit),
  })

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?${searchParams}`,
  )

  if (!response.ok) throw new Error('Failed to fetch photos.')

  const photosResult = (await response.json()) as Array<Photo>
  const totalCount = Number(response.headers.get('x-total-count')) // NOTE: the api consistently returns 5000 "photos"

  const photos = photosResult.map((photo) => ({
    ...photo,
    thumbnailUrl: generateStaticPhotos({
      id: photo.id,
      dimension,
      category,
    }),
  }))

  return { photos, totalCount }
}

/**
 * NOTE: Picsum only has 1085 photos, some of them are broken.
 * So I am going to make an executive decision to use "static.photos" for images.
 */

type GenerateStatisPhotosOpts = {
  id: number
  dimension: PhotoDimensions
  category: PhotoCategories
}

function generateStaticPhotos({
  id,
  dimension,
  category,
}: GenerateStatisPhotosOpts) {
  return `https://static.photos/${category}/${dimension.x}x${dimension.y}/${id}`
}
