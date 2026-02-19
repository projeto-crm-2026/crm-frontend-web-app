import { createFileRoute } from '@tanstack/react-router'
import { LoginFeature } from '../../../features/auth/login'

export const Route = createFileRoute('/_app/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginFeature />
}
