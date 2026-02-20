import type { PropsWithChildren } from 'react'

export function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen w-full" >
            < div className="hidden flex-1 flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex" >
                <div>
                    <h1 className="text-2xl font-bold tracking-tight" > CRM </h1>
                </div>
                < div className="space-y-2" >
                    <p className="text-lg font-medium" >
                        Gerencie seus clientes e conversas em um só lugar.
                    </p>
                    < p className="text-sm text-primary-foreground/70" >
                        Atendimento rápido, organizado e eficiente para sua equipe.
                    </p>
                </div>
                < p className="text-xs text-primary-foreground/50" >
                    © {new Date().getFullYear()} CRM Project
                </p>
            </div>

            <div className="flex flex-1 items-center justify-center bg-background px-6 py-12" >
                <div className="w-full max-w-sm" > {children} </div>
            </div>
        </div>
    )
}