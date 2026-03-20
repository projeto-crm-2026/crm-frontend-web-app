import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ContactsRepository } from '../repositories/contacts-repository'
import type { CreateContactPayload } from '../repositories/contacts-repository/types'
import { contactQueryKeys } from './query-keys'

export const useCreateContact = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createContact, isPending } = useMutation({
    mutationFn: (payload: CreateContactPayload) =>
      ContactsRepository.createContact({ payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactQueryKeys.all })
    }
  })

  return { createContact, isPending }
}
