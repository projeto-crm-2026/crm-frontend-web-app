import { ContactsTableContainer } from "./containers/contacts-table"
import ContactsLayout from "./layout"

export const ContactsFeature = () => {
  return (
    <ContactsLayout>
      <ContactsTableContainer />
    </ContactsLayout>
  )
}