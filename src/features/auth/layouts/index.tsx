import type { PropsWithChildren } from 'react'

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="bg-primary text-primary-foreground hidden flex-1 flex-col justify-between p-10 lg:flex">
        <div>
          <h1 className="text-2xl font-bold tracking-tight"> CRM </h1>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium">
            Gerencie seus clientes e conversas em um só lugar.
          </p>
          <p className="text-primary-foreground/70 text-sm">
            Atendimento rápido, organizado e eficiente para sua equipe.
          </p>
        </div>
        <p className="text-primary-foreground/50 text-xs">
          © {new Date().getFullYear()} CRM Project
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center bg-neutral-100 px-6 py-12">
        <div className="flex w-full justify-center"> {children} </div>
      </div>
    </div>
  )
}
