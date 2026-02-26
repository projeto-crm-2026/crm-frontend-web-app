import { createFileRoute } from '@tanstack/react-router'
import { HelpCenterFeature } from '../../../../features/help-center'

export const Route = createFileRoute('/_app/atendimento/central-ajuda/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <HelpCenterFeature />
}
