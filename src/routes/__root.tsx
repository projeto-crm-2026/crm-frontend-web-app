import type { QueryClient } from '@tanstack/react-query'
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRoute<RouterContext>({
  component: RootComponent
})

function RootComponent() {
  return (
    <div>
      <HeadContent />
      <Outlet />
    </div>
  )
}
