import { Outlet, createFileRoute } from '@tanstack/react-router'

// @ts-ignore
export const Route = createFileRoute('/_app')({
  component: RouteComponent
})

function RouteComponent() {
  return <Outlet />
}
