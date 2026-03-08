import { Divider } from '../../../../components/divider'
import { SectionDescription } from '../../../../components/section-description'
import { SectionTitle } from '../../../../components/section-title'

export const SecuritySection = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <SectionTitle>Segurança</SectionTitle>
        <SectionDescription>
          Controle o acesso e proteja a sua conta e organização.
        </SectionDescription>
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-slate-700">
              Autenticação de dois fatores (2FA)
            </span>
            <span className="text-xs text-slate-500">
              Adicione uma camada extra de segurança ao login.
            </span>
          </div>
          <button className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition-all hover:bg-blue-100">
            Configurar
          </button>
        </div>
        <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-slate-700">
              Sessões ativas
            </span>
            <span className="text-xs text-slate-500">
              Visualize e encerre sessões em outros dispositivos.
            </span>
          </div>
          <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-gray-50">
            Ver sessões
          </button>
        </div>
        <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-slate-700">
              Alterar senha
            </span>
            <span className="text-xs text-slate-500">
              Atualize a sua senha periodicamente.
            </span>
          </div>
          <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-gray-50">
            Alterar
          </button>
        </div>
        <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-slate-700">
              Log de auditoria
            </span>
            <span className="text-xs text-slate-500">
              Histórico de todas as ações realizadas no CRM.
            </span>
          </div>
          <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-gray-50">
            Ver logs
          </button>
        </div>
      </div>
    </div>
  )
}
