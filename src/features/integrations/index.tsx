import IntegrationsPanelContainer from './containers/integrations-panel'
import IntegrationsLayout from './layout'

export const IntegrationsFeature = () => {
  return (
    <IntegrationsLayout>
      <IntegrationsPanelContainer />
    </IntegrationsLayout>
  )
}
