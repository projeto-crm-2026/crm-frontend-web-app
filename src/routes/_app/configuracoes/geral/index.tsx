import { createFileRoute } from '@tanstack/react-router'

import { GeneralSettingsFeature } from '../../../../features/settings/general'

export const Route = createFileRoute('/_app/configuracoes/geral/')({
  component: RouteComponent
})

function RouteComponent() {
  return <GeneralSettingsFeature />
}
