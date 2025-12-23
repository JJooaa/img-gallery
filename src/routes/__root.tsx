import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-8 mx-auto max-w-7xl space-y-6">
        <Outlet />
      </div>
      <head>
        <HeadContent />
      </head>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
})
