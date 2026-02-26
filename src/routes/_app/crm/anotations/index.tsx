import { createFileRoute } from '@tanstack/react-router'

import { AnotationsFeature } from '../../../../features/anotations'

export const Route = createFileRoute('/_app/crm/anotations/')({
  component: RouteComponent
})

function RouteComponent() {
  return <AnotationsFeature />
}
