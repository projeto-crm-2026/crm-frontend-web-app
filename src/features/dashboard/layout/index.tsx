import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from 'crm-project-ui'
import type { PropsWithChildren } from 'react'

import { AppSidebar } from '../../../components/shared/app-sidebar'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <main className="flex w-full overflow-hidden text-foreground">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 lg:justify-between">
            <div className="-ml-1 mt-2 flex w-full items-center justify-start gap-2">
              <SidebarTrigger
                className="cursor-pointer border-transparent pl-4 pr-2 text-foreground"
                id="sidebar-main"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">CRM</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Visão Geral</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {children}
        </SidebarInset>
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout
