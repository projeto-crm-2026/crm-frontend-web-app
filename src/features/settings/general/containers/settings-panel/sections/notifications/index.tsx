import { useState } from 'react'

import { Divider } from '../../../../components/divider'
import { SectionDescription } from '../../../../components/section-description'
import { SectionTitle } from '../../../../components/section-title'

export const NotificationsSection = () => {
  const [prefs, setPrefs] = useState({
    new_lead: true,
    deal_update: true,
    task_reminder: false,
    weekly_report: true,
    member_join: false,
    api_alert: true
  })

  const toggle = (key: keyof typeof prefs) =>
    setPrefs(v => ({ ...v, [key]: !v[key] }))

  const notifs = [
    {
      key: 'new_lead' as const,
      label: 'Novo lead criado',
      desc: 'Quando um contato ou empresa é adicionado.'
    },
    {
      key: 'deal_update' as const,
      label: 'Atualização de negócio',
      desc: 'Movimentações no pipeline de vendas.'
    },
    {
      key: 'task_reminder' as const,
      label: 'Lembrete de tarefa',
      desc: 'Avisos de tarefas próximas do vencimento.'
    },
    {
      key: 'weekly_report' as const,
      label: 'Relatório semanal',
      desc: 'Resumo da semana toda segunda-feira.'
    },
    {
      key: 'member_join' as const,
      label: 'Novo membro',
      desc: 'Quando alguém aceita o convite da equipe.'
    },
    {
      key: 'api_alert' as const,
      label: 'Alertas de API',
      desc: 'Erros e uso acima do limite das chaves de API.'
    }
  ]

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <SectionTitle>Notificações</SectionTitle>
        <SectionDescription>
          Escolha quais eventos geram notificações para você.
        </SectionDescription>
      </div>
      <Divider />
      <div className="flex flex-col gap-0 rounded-md border border-gray-300 bg-white px-4 py-6">
        {notifs.map((n, i) => (
          <div
            key={n.key}
            className={`flex items-center justify-between border-b border-gray-300 py-3 first:pt-0 last:border-transparent last:pb-0 ${i !== notifs.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-slate-700">
                {n.label}
              </span>
              <span className="text-xs text-slate-500">{n.desc}</span>
            </div>
            <button
              onClick={() => toggle(n.key)}
              className={`relative h-4.5 w-8 rounded-full transition-all ${prefs[n.key] ? 'bg-blue-500' : 'bg-gray-400'}`}
            >
              <span
                className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white shadow transition-all ${prefs[n.key] ? 'left-4' : 'left-0.5'}`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
