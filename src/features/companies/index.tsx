import { CompaniesTableContainer } from "./containers/companies-table"
import CompaniesLayout from "./layout"

export const CompaniesFeature = () => {
  return (
    <CompaniesLayout>
      <CompaniesTableContainer />
    </CompaniesLayout>
  )
}