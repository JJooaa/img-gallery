import { createFileRoute, useRouter } from '@tanstack/react-router'
import type { PhotoCategories } from '@/types'
import { Button } from '@/components/ui/button'
import { DefaultNotFoundComponent } from '@/components/default-not-found'
import { DefaultLoadingComponent } from '@/components/default-loading'
import { DefaultErrorComponent } from '@/components/default-error'
import { fetchPhotoById } from '@/api'

type PhotoIdSearch = {
  category: PhotoCategories
}

export const Route = createFileRoute('/photo/$id')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): PhotoIdSearch => {
    return {
      category: (search.category as PhotoCategories) ?? 'nature',
    }
  },
  loaderDeps: ({ search }) => ({
    category: search.category,
  }),
  loader: async ({ params, deps }) => {
    const photo = await fetchPhotoById({
      id: Number(params.id),
      category: deps.category,
    })

    return { photo }
  },
  notFoundComponent: () => <DefaultNotFoundComponent />,
  pendingComponent: () => <DefaultLoadingComponent />,
  errorComponent: () => <DefaultErrorComponent />,
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.photo.title }],
  }),
})

function RouteComponent() {
  const { photo } = Route.useLoaderData()
  const router = useRouter()

  return (
    <>
      <h1 className="text-5xl font-semibold">{photo.title}</h1>
      <div>
        <Button onClick={() => router.history.back()}>Go back</Button>
      </div>
      <img
        src={photo.url}
        alt={photo.title}
        onError={(e) => (e.currentTarget.src = '/logo512.png')} // for images that don't exist, replace them with a React Logo
      />
    </>
  )
}

export default Route
