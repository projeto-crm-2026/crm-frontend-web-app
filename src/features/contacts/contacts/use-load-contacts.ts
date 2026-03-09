import { useCallback, useEffect } from 'react'

import {
  type UseQueryOptions,
  queryOptions,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import type { Contact } from '../../../domain/entities/contact'
import { ContactsRepository } from '../repositories/contacts-repository'
import { contactQueryKeys } from './query-keys'

export const createLoadContactsQuery = ({
  query,
  options
}: {
  query?: string
  options?: Partial<UseQueryOptions<Contact[]>>
}) => {
  return queryOptions({
    queryKey: contactQueryKeys.search(query),
    queryFn: () => {
      if (query) {
        return ContactsRepository.searchContacts({ query })
      }
      return ContactsRepository.searchContacts({})
    },
    staleTime: 1000 * 60 * 5,
    ...options
  })
}

export const useLoadContacts = ({
  query,
  options
}: {
  query?: string
  options?: Partial<UseQueryOptions<Contact[]>>
}) => {
  return useQuery(createLoadContactsQuery({ query, options }))
}

export function usePrefetchContacts(queries?: Array<string>) {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!queries?.length) return

    for (const query of queries) {
      const hasCached = queryClient.getQueryData(['load-contacts', query])

      if (hasCached) continue

      queryClient.prefetchQuery(createLoadContactsQuery({ query }))
    }
  }, [queries, queryClient])
}

export function useContactsCache() {
  const queryClient = useQueryClient()

  const getData = useCallback(
    (query?: string) => {
      return queryClient.getQueryData(['load-contacts', query] as const)
    },
    [queryClient]
  )

  return { getData }
}
