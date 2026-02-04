import { createFileRoute } from '@tanstack/react-router'
import { ContactsFeature } from '../../../../features/contacts'

export const Route = createFileRoute('/_app/crm/contatos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ContactsFeature />
}
