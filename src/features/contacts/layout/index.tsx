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

const ContactsLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <main className="overflow-hidden flex w-full text-foreground">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 lg:justify-between">
            <div className="mt-2 flex w-full items-center justify-start gap-2">
              <SidebarTrigger
                className="text-foreground -ml-1 cursor-pointer border-transparent pr-2 pl-4"
                id="sidebar-main"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">CRM</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Contatos</BreadcrumbPage>
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

export default ContactsLayout
