import { KanbanContainer } from "./containers/kanban-container"
import KanbanLayout from "./layouts"

export const DealsFeature = () => {
  return (
    <KanbanLayout>
      <KanbanContainer />
    </KanbanLayout>
  )
}