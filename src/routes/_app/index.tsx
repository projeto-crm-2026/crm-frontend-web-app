import { createFileRoute } from '@tanstack/react-router'

//@ts-ignore
export const Route = createFileRoute('/_app/')({
  component: IndexPage
})

function IndexPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Teste sidebar</h1>

      <p className="mt-2 text-sm text-neutral-600">
        Testando conteudo dentro da sidebar do projeto de CRM
      </p>
    </div>
  )
}
