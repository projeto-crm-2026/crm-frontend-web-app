import { createFileRoute } from "@tanstack/react-router";
import { useNavigationHistory } from "../../../components/shared/NavigationHistory";
import { useEffect } from "react";

export const Route = createFileRoute("/_app/calendar/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setHistory } = useNavigationHistory();

  useEffect(() => {
    setHistory({
      main: {
        title: "Agenda",
        url: "/calendar",
      },
      items: [],
    });
  }, []);

  //Vê se no seu PC isso funciona vittin.

  return (
    <div className="min-h-screen pt-2 w-full">
      <div className="text-3xl">Testando</div>
    </div>
  );
}
