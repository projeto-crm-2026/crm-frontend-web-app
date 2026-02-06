import { createFileRoute } from '@tanstack/react-router'
import { DealsFeature } from '../../../../features/deals'

export const Route = createFileRoute('/_app/crm/deals/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DealsFeature />
}
