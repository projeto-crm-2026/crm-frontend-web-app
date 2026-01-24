import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'crm-project-ui/index.css'
import './index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { queryClient } from './instances/react-query.ts'
import { routeTree } from './route-tree.gen.ts'

const router = createRouter({
  routeTree,
  context: {
    queryClient
  }
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
