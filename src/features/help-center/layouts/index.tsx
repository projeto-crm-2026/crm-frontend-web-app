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

const HelpCenterLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <main className="flex h-screen w-full overflow-hidden text-foreground">
        <AppSidebar />
        <SidebarInset className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 lg:justify-between">
            <div className="mt-2 flex w-full items-center justify-start gap-2">
              <SidebarTrigger
                className="text-foreground -ml-1 cursor-pointer border-transparent pr-2 pl-4"
                id="sidebar-main"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Atendimento</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Central de Ajuda</BreadcrumbPage>
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

export default HelpCenterLayout