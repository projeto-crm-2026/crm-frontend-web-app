import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Modal } from '../../../../components/shared/modal'
import {
  ContactSource,
  ContactType,
  LeadStatus
} from '../../../../domain/entities/contact'
import { useCreateContact } from '../../contacts/use-create-contact'
import { Field } from './field'
import { type CreateContactFormValues, createContactSchema } from './schema'

interface CreateContactModalProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  [LeadStatus.LEAD]: 'Lead',
  [LeadStatus.QUALIFIED]: 'Qualificado',
  [LeadStatus.CUSTOMER]: 'Cliente',
  [LeadStatus.INACTIVE]: 'Inativo',
  [LeadStatus.LOST]: 'Perdido'
}

const CONTACT_TYPE_LABELS: Record<ContactType, string> = {
  [ContactType.PERSON]: 'Pessoa',
  [ContactType.COMPANY]: 'Empresa'
}

const CONTACT_SOURCE_LABELS: Record<ContactSource, string> = {
  [ContactSource.WEBSITE]: 'Website',
  [ContactSource.REFERRAL]: 'Indicação',
  [ContactSource.EMAIL]: 'E-mail',
  [ContactSource.PAID_ADS]: 'Anúncios pagos',
  [ContactSource.ORGANIC_SEARCH]: 'Busca orgânica',
  [ContactSource.SOCIAL_MEDIA]: 'Redes sociais',
  [ContactSource.EVENT]: 'Evento',
  [ContactSource.OTHER]: 'Outro'
}

export const CreateContactModal = ({
  isOpen,
  setIsOpen
}: CreateContactModalProps) => {
  const { createContact, isPending } = useCreateContact()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateContactFormValues>({
    resolver: zodResolver(createContactSchema)
  })

  const handleClose = () => {
    reset()
    setIsOpen(false)
  }

  const onSubmit = async (values: CreateContactFormValues) => {
    try {
      await createContact({
        first_name: values.full_name,
        type: values.type,
        status: values.status,
        email: values.email || undefined,
        phone: values.phone || undefined,
        company_name: values.company_name || undefined,
        source: values.source,
        tags: values.tags
      })
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  const inputClass = (hasError: boolean) =>
    [
      'w-full rounded-md border bg-background px-3 py-1.5 text-sm transition-all duration-200',
      'placeholder:text-muted-foreground focus:border-neutral-400 focus-visible:outline-none',
      hasError ? 'border-red-400 focus:border-red-400' : 'border-input'
    ].join(' ')

  return (
    <Modal isOpen={isOpen} setIsOpen={handleClose}>
      <div className="flex flex-col gap-6 rounded-md bg-white p-6 xl:min-w-lg">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight">Novo Contato</h2>
          <p className="text-muted-foreground text-sm">
            Preencha as informações para adicionar um novo contato.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field label="Nome completo" error={errors.full_name?.message}>
            <input
              {...register('full_name')}
              placeholder="João Silva"
              className={inputClass(!!errors.full_name)}
            />
          </Field>
          <Field label="E-mail" error={errors.email?.message}>
            <input
              {...register('email')}
              type="email"
              placeholder="joao@empresa.com"
              className={inputClass(!!errors.email)}
            />
          </Field>

          <Field label="Telefone" error={errors.phone?.message}>
            <input
              {...register('phone')}
              placeholder="+55 11 99999-0000"
              className={inputClass(!!errors.phone)}
            />
          </Field>
          <Field label="Empresa" error={errors.company_name?.message}>
            <input
              {...register('company_name')}
              placeholder="Acme Ltda."
              className={inputClass(!!errors.company_name)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Status" error={errors.status?.message}>
              <select
                {...register('status')}
                className={inputClass(!!errors.status)}
              >
                <option value="">Selecione</option>
                {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tipo" error={errors.type?.message}>
              <select
                {...register('type')}
                className={inputClass(!!errors.type)}
              >
                <option value="">Selecione</option>
                {Object.entries(CONTACT_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Origem" error={errors.source?.message}>
            <select
              {...register('source')}
              className={inputClass(!!errors.source)}
            >
              <option value="">Selecione (opcional)</option>
              {Object.entries(CONTACT_SOURCE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="border-input inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-all hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110 disabled:pointer-events-none disabled:opacity-50"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isPending ? 'Salvando...' : 'Salvar contato'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
