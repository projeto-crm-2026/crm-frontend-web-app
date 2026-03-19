import { createFileRoute } from '@tanstack/react-router'

import { IntegrationsFeature } from '../../../../features/integrations'

export const Route = createFileRoute('/_app/configuracoes/integracoes/')({
  component: RouteComponent
})

function RouteComponent() {
  return <IntegrationsFeature />
}
