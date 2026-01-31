import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "crm-project-ui";

import {
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";

import { AppSidebar } from "../../components/shared/app-sidebar";
import {
  NavigationHistory,
  NavigationHistoryProvider,
} from "../../components/shared/NavigationHistory";

// @ts-ignore
export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <NavigationHistoryProvider>
      <SidebarProvider>
        <main className="flex w-full text-neutral-700">
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 lg:justify-between">
              <div className="mt-2 flex w-full items-center justify-start gap-2">
                <SidebarTrigger
                  className="text-foreground -ml-1 cursor-pointer border-transparent pr-2 pl-4"
                  id="sidebar-main"
                />
                <NavigationHistory />
              </div>
            {/* <div className="flex w-full items-center justify-end">
              <SearchCompanies />
            </div> */}
          </header>
          <Outlet />
        </SidebarInset>
      </main>
    </SidebarProvider>
    </NavigationHistoryProvider>
  );
}
