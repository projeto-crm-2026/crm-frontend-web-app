import { useState } from 'react'
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard
} from '../../../../components/ui/kanban'
import { formatCurrency } from '../../../../utils/helpers/format-currency'
import { Building2 } from 'lucide-react'
import { StatusBadge } from '../../components/status-badge'

type Deal = {
  id: string
  title: string
  value: number
  company: string
  contact: string
  column: string
  temperature: 'hot' | 'warm' | 'cold'
}

type Column = {
  id: string
  name: string
}

export const KanbanContainer = () => {
  const [columns] = useState<Column[]>([
    { id: 'lead-in', name: 'Novo Lead' },
    { id: 'qualifying', name: 'Qualificação' },
    { id: 'contacted', name: 'Contato Realizado' },
    { id: 'proposal', name: 'Proposta Enviada' },
    { id: 'negotiation', name: 'Negociação' },
    { id: 'won', name: 'Ganho' },
    { id: 'lost', name: 'Perdido' }
  ])

  const [deals, setDeals] = useState<Deal[]>([
    {
      id: '1',
      title: 'Website institucional',
      value: 8500,
      company: 'ACME Ltda',
      contact: 'João Silva',
      column: 'lead-in',
      temperature: 'cold'
    },
    {
      id: '2',
      title: 'Sistema interno',
      value: 32000,
      company: 'Beta Tech',
      contact: 'Maria Souza',
      column: 'proposal',
      temperature: 'warm'
    },
    {
      id: '3',
      title: 'Landing Page',
      value: 4500,
      company: 'StartX',
      contact: 'Lucas Rocha',
      column: 'negotiation',
      temperature: 'warm'
    },
    {
      id: '4',
      title: 'App Mobile',
      value: 120000,
      company: 'FinCorp',
      contact: 'Ana Lima',
      column: 'won',
      temperature: 'hot'
    },

    {
      id: '5',
      title: 'Sistema de agendamentos',
      value: 18000,
      company: 'CliniMais',
      contact: 'Paula Ribeiro',
      column: 'qualifying',
      temperature: 'warm'
    },
    {
      id: '6',
      title: 'Plataforma EAD',
      value: 65000,
      company: 'EduPrime',
      contact: 'Ricardo Nunes',
      column: 'proposal',
      temperature: 'hot'
    },
    {
      id: '7',
      title: 'Dashboard BI',
      value: 24000,
      company: 'DataCorp',
      contact: 'Fernanda Costa',
      column: 'contacted',
      temperature: 'warm'
    },
    {
      id: '8',
      title: 'Automação comercial',
      value: 42000,
      company: 'SalesNow',
      contact: 'Thiago Martins',
      column: 'negotiation',
      temperature: 'hot'
    },
    {
      id: '9',
      title: 'Portal do cliente',
      value: 15000,
      company: 'ServPlus',
      contact: 'Camila Azevedo',
      column: 'lead-in',
      temperature: 'cold'
    },
    {
      id: '10',
      title: 'ERP sob medida',
      value: 98000,
      company: 'IndusTech',
      contact: 'Bruno Farias',
      column: 'qualifying',
      temperature: 'warm'
    },
    {
      id: '11',
      title: 'Marketplace B2B',
      value: 140000,
      company: 'TradeHub',
      contact: 'Daniel Rocha',
      column: 'proposal',
      temperature: 'hot'
    },
    {
      id: '12',
      title: 'App delivery',
      value: 72000,
      company: 'FastEats',
      contact: 'Juliana Mendes',
      column: 'negotiation',
      temperature: 'hot'
    },
    {
      id: '13',
      title: 'Sistema financeiro',
      value: 56000,
      company: 'FinOps',
      contact: 'Rafael Teixeira',
      column: 'contacted',
      temperature: 'warm'
    },
    {
      id: '14',
      title: 'Plataforma SaaS',
      value: 180000,
      company: 'CloudOne',
      contact: 'André Lima',
      column: 'proposal',
      temperature: 'hot'
    },
    {
      id: '15',
      title: 'Website institucional premium',
      value: 22000,
      company: 'LuxCorp',
      contact: 'Patrícia Gomes',
      column: 'contacted',
      temperature: 'warm'
    },
    {
      id: '16',
      title: 'CRM customizado',
      value: 87000,
      company: 'BizForce',
      contact: 'Marcos Pereira',
      column: 'negotiation',
      temperature: 'hot'
    },
    {
      id: '17',
      title: 'Plataforma de eventos',
      value: 34000,
      company: 'Eventify',
      contact: 'Larissa Duarte',
      column: 'qualifying',
      temperature: 'warm'
    },
    {
      id: '18',
      title: 'Sistema de estoque',
      value: 27000,
      company: 'LogiStore',
      contact: 'Felipe Barros',
      column: 'contacted',
      temperature: 'warm'
    },
    {
      id: '19',
      title: 'App fitness',
      value: 46000,
      company: 'FitLife',
      contact: 'Renata Pacheco',
      column: 'lead-in',
      temperature: 'cold'
    },
    {
      id: '20',
      title: 'Portal educacional',
      value: 52000,
      company: 'EduTech Brasil',
      contact: 'Sérgio Matos',
      column: 'negotiation',
      temperature: 'hot'
    },
    {
      id: '21',
      title: 'Sistema de reservas',
      value: 31000,
      company: 'HotelNow',
      contact: 'Carla Monteiro',
      column: 'contacted',
      temperature: 'warm'
    },
    {
      id: '22',
      title: 'Plataforma logística',
      value: 155000,
      company: 'MoveFast',
      contact: 'Gustavo Araujo',
      column: 'proposal',
      temperature: 'hot'
    },
    {
      id: '23',
      title: 'Website institucional',
      value: 12000,
      company: 'EcoSustent',
      contact: 'Natália Reis',
      column: 'lead-in',
      temperature: 'cold'
    },
    {
      id: '24',
      title: 'Sistema de RH',
      value: 48000,
      company: 'PeopleFirst',
      contact: 'Rodrigo Teles',
      column: 'qualifying',
      temperature: 'warm'
    },
    {
      id: '25',
      title: 'Plataforma IoT',
      value: 210000,
      company: 'SmartGrid',
      contact: 'Eduardo Pires',
      column: 'proposal',
      temperature: 'hot'
    },
    {
      id: '26',
      title: 'Aplicativo bancário',
      value: 350000,
      company: 'BankX',
      contact: 'Marcelo Cunha',
      column: 'negotiation',
      temperature: 'hot'
    }
  ])

  const handleDataChange = (newData: Deal[]) => {
    setDeals(newData)
  }

  return (
    <div className="kanban-scroll mb-1 h-full w-full max-w-full overflow-x-scroll p-4 flex flex-col gap-6 lg:gap-8">
      <article className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight">Meu Kankan</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Acompanhe e gerencie suas oportunidades de venda em tempo real, com
          uma visão clara de todo o seu funil comercial.
        </p>
      </article>

      <KanbanProvider
        columns={columns}
        data={deals}
        onDataChange={handleDataChange}
        onDragEnd={() => {}}
        className="h-auto w-full"
      >
        {column => (
          <KanbanBoard key={column.id} id={column.id}>
            <KanbanHeader>{column.name}</KanbanHeader>

            <KanbanCards id={column.id}>
              {(deal: Deal) => (
                <KanbanCard key={deal.id} {...deal}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="line-clamp-2 text-[13px] leading-tight font-semibold">
                        {deal.title}
                      </p>
                      <StatusBadge status={deal.temperature} />
                    </div>

                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <Building2 className="h-3.5 w-3.5" />
                      <span className="mt-px">{deal.company}</span>
                    </div>

                    <div className="mt-px flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {deal.contact}
                      </span>

                      <span className="text-foreground font-semibold">
                        {formatCurrency(deal.value)}
                      </span>
                    </div>
                  </div>
                </KanbanCard>
              )}
            </KanbanCards>
          </KanbanBoard>
        )}
      </KanbanProvider>
    </div>
  )
}
