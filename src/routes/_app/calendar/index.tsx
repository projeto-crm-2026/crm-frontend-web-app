import { createFileRoute } from "@tanstack/react-router";
import { CalendarFeature } from "../../../features/calendar";

export const Route = createFileRoute("/_app/calendar/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CalendarFeature />;
}
