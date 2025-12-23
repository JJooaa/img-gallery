import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { PhotoCategories } from '@/types'
import { fetchPhotos } from '@/api'
import { Button } from '@/components/ui/button'
import { DefaultLoadingComponent } from '@/components/default-loading'
import { DefaultErrorComponent } from '@/components/default-error'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  CategorySearchFilter,
  PageLimitSearchFilter,
} from '@/components/search-filters'

type PhotoSearch = {
  page: number
  limit: number
  category: PhotoCategories
}

export const Route = createFileRoute('/')({
  component: App,
  validateSearch: (search: Record<string, unknown>): PhotoSearch => {
    return {
      page: Number(search.page ?? 1),
      limit: Number(search.limit ?? 20),
      category: (search.category as PhotoCategories) ?? 'nature',
    }
  },
  loaderDeps: ({ search }) => ({
    page: search.page,
    limit: search.limit,
    category: search.category,
  }),
  loader: async ({ deps }) => {
    const { photos, totalCount } = await fetchPhotos({
      page: deps.page,
      limit: deps.limit,
      category: deps.category,
    })

    const totalPages = Math.ceil(totalCount / deps.limit)

    return { photos, totalPages }
  },
  pendingComponent: () => <DefaultLoadingComponent />,
  errorComponent: () => <DefaultErrorComponent />,
})

function App() {
  const { photos, totalPages } = Route.useLoaderData()
  const { page, category } = Route.useSearch()

  return (
    <>
      <h1 className="text-5xl font-semibold">Photo Gallery</h1>
      <div className="flex gap-4 md:gap-0 flex-col-reverse md:grid md:grid-cols-4">
        {/* Left side gallery grid */}
        <div className="space-y-2 space-x-2 col-span-3 max-w-fit">
          <div className="flex flex-wrap gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <Link
                  to="/photo/$id"
                  params={{ id: String(photo.id) }}
                  search={{ category }}
                  className="inset-0 z-5 size-full absolute"
                />
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="group-hover:scale-105"
                  onError={(e) => (e.currentTarget.src = '/logo192.png')} // for images that don't work, replace them with a React Logo
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right side query configuration */}
        <Card className="max-h-fit">
          <CardHeader>
            <CardTitle>Gallery configuration</CardTitle>
            <CardDescription>
              Tanstack Router with typesafe, fantastic way to work with search
              params.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <PageLimitSearchFilter />
            <CategorySearchFilter />
            <div className="space-x-4 flex w-full justify-between">
              <Link
                from={Route.fullPath}
                disabled={page <= 1}
                search={(prev) => ({ ...prev, page: page - 1 })}
              >
                <Button disabled={page <= 1} variant="outline" size="icon">
                  <ArrowLeft />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Page {page}</span>
                <span>of</span>
                <span className="font-medium text-foreground">
                  {totalPages}
                </span>
              </div>
              <Link
                from={Route.fullPath}
                disabled={page >= totalPages}
                search={(prev) => ({ ...prev, page: page + 1 })}
              >
                <Button
                  disabled={page >= totalPages}
                  variant="outline"
                  size="icon"
                >
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
