import { useNavigate, useSearch } from '@tanstack/react-router'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import type { PhotoCategories } from '@/types'
import { PAGE_LIMITS, PHOTO_CATEGORIES } from '@/lib/consts'

export function PageLimitSearchFilter() {
  const navigate = useNavigate({ from: '/' })
  const { limit } = useSearch({ from: '/' })

  const handlePageLimitChange = (value: string) => {
    navigate({
      from: '/',
      search: (prev) => ({ ...prev, limit: Number(value) }),
    })
  }

  return (
    <>
      <label className="text-sm">Photos per page</label>
      <Select value={String(limit)} onValueChange={handlePageLimitChange}>
        <SelectTrigger className="mt-0.5 w-full">
          <SelectValue placeholder="Select page limit" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel>Limits</SelectLabel>
            {PAGE_LIMITS.map((pageLimit) => (
              <SelectItem key={pageLimit} value={String(pageLimit)}>
                {pageLimit}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

export function CategorySearchFilter() {
  const navigate = useNavigate({ from: '/' })
  const { category } = useSearch({ from: '/' })

  const handleCategoryChange = (value: PhotoCategories) => {
    navigate({
      from: '/',
      search: (prev) => ({ ...prev, category: value }),
    })
  }

  return (
    <>
      <label className="text-sm">Category</label>
      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="mt-0.5 w-full capitalize">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {PHOTO_CATEGORIES.map((photoCategory) => (
              <SelectItem
                key={photoCategory}
                value={String(photoCategory)}
                className="capitalize"
              >
                {photoCategory}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
