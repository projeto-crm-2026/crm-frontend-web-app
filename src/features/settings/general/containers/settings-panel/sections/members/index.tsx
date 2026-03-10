import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'crm-project-ui'
import { ArrowUpDown, Link2, Search, Shield, ShieldOff, X } from 'lucide-react'
import { useState } from 'react'

const MEMBERS_MOCK = [
  {
    id: '1',
    name: 'Lucas Ferreira',
    email: 'lucas@empresa.com.br',
    role: 'Owner' as const,
    avatar: null,
    joined: '1 ano atrás',
    lastLogin: '2 minutos atrás',
    twoFa: true,
    isYou: true
  },
  {
    id: '2',
    name: 'Ana Souza',
    email: 'ana@empresa.com.br',
    role: 'Admin' as const,
    avatar: null,
    joined: '8 meses atrás',
    lastLogin: '1 hora atrás',
    twoFa: true,
    isYou: false
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@empresa.com.br',
    role: 'Member' as const,
    avatar: null,
    joined: '6 meses atrás',
    lastLogin: '3 dias atrás',
    twoFa: false,
    isYou: false
  },
  {
    id: '4',
    name: 'Carla Lima',
    email: 'carla@empresa.com.br',
    role: 'Member' as const,
    avatar: null,
    joined: '2 meses atrás',
    lastLogin: 'há 2 semanas',
    twoFa: false,
    isYou: false
  }
]

const PENDING_INVITES_MOCK = [
  {
    id: 'inv-1',
    email: 'julia@empresa.com.br',
    role: 'Member' as const,
    createdBy: 'Lucas Ferreira',
    createdAt: '3 dias atrás',
    inviteLink: 'https://crm.app/invite/abc123'
  }
]

const ROLE_STYLES: Record<string, string> = {
  Owner: 'border-blue-400 text-blue-500',
  Admin: 'border-orange-400 text-orange-500',
  Member: 'border-gray-400 text-slate-500'
}

const RoleBadge = ({ role }: { role: string }) => (
  <span
    className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium ${ROLE_STYLES[role]}`}
  >
    {role}
  </span>
)

const TwoFaBadge = ({ enabled }: { enabled: boolean }) => (
  <span
    className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-medium ${
      enabled
        ? 'border-green-700 text-green-800'
        : 'border-amber-400 text-amber-600'
    }`}
  >
    {enabled ? (
      <>
        <Shield className="h-3 w-3" /> 2FA ativo
      </>
    ) : (
      <>
        <ShieldOff className="h-3 w-3" /> 2FA inativo
      </>
    )}
  </span>
)

const SortableHead = ({ children }: { children: React.ReactNode }) => (
  <TableHead>
    <button className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase transition-colors hover:text-slate-600">
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  </TableHead>
)

export const MembersSection = () => {
  const [search, setSearch] = useState('')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [pendingInvites, setPendingInvites] = useState(PENDING_INVITES_MOCK)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredMembers = MEMBERS_MOCK.filter(
    m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleCopyLink = (id: string, link: string) => {
    navigator.clipboard.writeText(link)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  const handleRevokeInvite = (id: string) => {
    setPendingInvites(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-700">
              Convites pendentes
            </h2>
            <Link2 className="h-3.5 w-3.5 cursor-pointer text-slate-500" />
          </div>
          <p className="text-sm text-slate-500">
            Gerencie os convites enviados para entrar na organização.
          </p>
        </div>

        <div className="rounded-md border border-gray-300 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <SortableHead>Convidado</SortableHead>
                <SortableHead>Nível</SortableHead>
                <SortableHead>Criado por</SortableHead>
                <SortableHead>Criado em</SortableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase">
                  Link de convite
                </TableHead>
                <TableHead className="w-[40px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingInvites.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-6 text-center text-sm text-slate-400"
                  >
                    Nenhum convite pendente. Convide um novo membro abaixo.
                  </TableCell>
                </TableRow>
              ) : (
                pendingInvites.map(invite => (
                  <TableRow key={invite.id}>
                    <TableCell className="text-sm text-slate-700">
                      {invite.email}
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={invite.role} />
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {invite.createdBy}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {invite.createdAt}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() =>
                          handleCopyLink(invite.id, invite.inviteLink)
                        }
                        className="inline-flex items-center gap-1.5 rounded border border-gray-300 bg-gray-50 px-2.5 py-1 text-xs text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Link2 className="h-3 w-3" />
                        {copiedId === invite.id ? 'Copiado!' : 'Copiar link'}
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleRevokeInvite(invite.id)}
                        className="rounded p-1 text-slate-300 transition-all hover:bg-blue-50 hover:text-blue-500"
                        title="Revogar convite"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-700">
              Membros da organização
            </h2>
            <Link2 className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500">
            Visualize e gerencie os membros atuais e seus níveis de acesso.
          </p>
        </div>

        <div className="relative max-w-xs bg-white">
          <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar membros"
            className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-9 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-400 focus:border-slate-500"
          />
        </div>

        <div className="rounded-md border border-gray-300 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <SortableHead>Nome</SortableHead>
                <SortableHead>E-mail</SortableHead>
                <SortableHead>Nível</SortableHead>
                <SortableHead>2FA</SortableHead>
                <SortableHead>Entrou</SortableHead>
                <SortableHead>Último acesso</SortableHead>
                <TableHead className="w-[40px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-6 text-center text-sm text-slate-400"
                  >
                    Nenhum membro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-xs font-bold text-blue-500">
                          {member.name.charAt(0)}
                        </div>
                        <span className="text-[13px] font-medium text-slate-700">
                          {member.name}
                          {member.isYou && (
                            <span className="ml-1.5 text-xs font-normal text-slate-400">
                              (você)
                            </span>
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[13px] text-slate-500">
                      {member.email}
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={member.role} />
                    </TableCell>
                    <TableCell>
                      <TwoFaBadge enabled={member.twoFa} />
                    </TableCell>
                    <TableCell className="text-[13px] text-slate-500">
                      {member.joined}
                    </TableCell>
                    <TableCell className="text-[13px] text-slate-500">
                      {member.lastLogin}
                    </TableCell>
                    <TableCell>
                      {!member.isYou && member.role !== 'Owner' && (
                        <button className="rounded p-1 text-slate-300 transition-all hover:bg-blue-50 hover:text-blue-500">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-semibold text-slate-700">
            Autenticação de dois fatores
          </h2>
          <p className="text-sm text-slate-500">
            Exija 2FA para todos os membros da organização.
          </p>
        </div>
        <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-slate-700">
              Exigir 2FA para todos
            </span>
            <span className="text-xs text-slate-500">
              Membros sem 2FA ativo serão bloqueados até configurarem.
            </span>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-medium text-slate-500 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600">
            <Shield className="h-3.5 w-3.5" />
            Ativar política
          </button>
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="flex w-full max-w-md flex-col gap-5 rounded-xl border border-gray-300 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-base font-semibold text-slate-700">
                  Convidar membro
                </h3>
                <p className="text-sm text-slate-500">
                  Um link de convite será enviado por e-mail.
                </p>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="rounded-md p-1 text-slate-400 transition-all hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="email@empresa.com"
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Nível de acesso
                </label>
                <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition-all outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                  <option>Member</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowInviteModal(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowInviteModal(false)}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
              >
                Enviar convite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
