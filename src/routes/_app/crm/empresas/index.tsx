import { createFileRoute } from '@tanstack/react-router'
import { CompaniesFeature } from '../../../../features/companies'

export const Route = createFileRoute('/_app/crm/empresas/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CompaniesFeature />
}
