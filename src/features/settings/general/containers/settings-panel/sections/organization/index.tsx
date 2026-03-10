import { Check } from 'lucide-react'

import { Divider } from '../../../../components/divider'
import { SectionDescription } from '../../../../components/section-description'
import { SectionTitle } from '../../../../components/section-title'

export const OrganizationSection = () => {
  return (
    <div className="flex max-w-xl flex-col gap-6">
      <div className="flex flex-col">
        <SectionTitle>Organização</SectionTitle>
        <SectionDescription>
          Gerencie as informações da sua empresa no CRM.
        </SectionDescription>
      </div>
      <Divider />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            Nome da organização
          </label>
          <input
            defaultValue="Empresa S.A."
            className="w-full max-w-md rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition-all outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 xl:max-w-xl"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Domínio</label>
          <input
            defaultValue="empresa.com.br"
            className="w-full max-w-md rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition-all outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 xl:max-w-xl"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Setor</label>
          <select className="w-full max-w-md rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition-all outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 xl:max-w-xl">
            <option>Tecnologia</option>
            <option>Finanças</option>
            <option>Saúde</option>
            <option>Varejo</option>
            <option>Serviços</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            Fuso horário
          </label>
          <select className="w-full max-w-md rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition-all outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 xl:max-w-xl">
            <option>America/Sao_Paulo (UTC-3)</option>
            <option>America/New_York (UTC-5)</option>
            <option>Europe/London (UTC+0)</option>
          </select>
        </div>
      </div>

      <div className="pt-2">
        <button className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110">
          <Check className="h-4 w-4" />
          Salvar alterações
        </button>
      </div>

      <Divider />

      <div className="flex flex-col gap-3 rounded-md border border-gray-300 bg-white p-4">
        <div className="flex flex-col gap-1 border-b border-gray-300 pb-3">
          <h3 className="text-sm font-semibold">Zona de perigo</h3>
          <p className="text-sm text-slate-500">
            Ações irreversíveis para sua organização.
          </p>
        </div>
        <div className="flex items-center justify-between rounded-md">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-slate-700">
              Excluir organização
            </span>
            <span className="text-xs text-slate-500">
              Remove permanentemente todos os dados e acessos.
            </span>
          </div>
          <button className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition-all hover:bg-neutral-100">
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
