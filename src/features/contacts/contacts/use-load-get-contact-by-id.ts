import { useCallback, useEffect } from 'react'

import {
  type UseQueryOptions,
  queryOptions,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { ContactsRepository } from '../repositories/contacts-repository'
import { contactQueryKeys } from './query-keys'
import { createLoadContactsQuery } from './use-load-contacts'

export const createGetContactByIdQuery = ({
  id,
  options
}: {
  id?: string
  options?: Partial<UseQueryOptions>
}) => {
  return queryOptions({
    queryKey: contactQueryKeys.byId(id),
    queryFn: () => ContactsRepository.getContactById({ id: id! }),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    ...options
  })
}

export const useGetContactById = ({
  id,
  options
}: {
  id?: string
  options?: Partial<UseQueryOptions>
}) => {
  return useQuery(createGetContactByIdQuery({ id, options }))
}

export function usePrefetchContacts(queries?: Array<string>) {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!queries?.length) return

    for (const query of queries) {
      const hasCached = queryClient.getQueryData(contactQueryKeys.search(query))

      if (hasCached) continue

      queryClient.prefetchQuery(createLoadContactsQuery({ query }))
    }
  }, [queries, queryClient])
}

export function usePrefetchContactsByIds(ids?: Array<string>) {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!ids?.length) return

    for (const id of ids) {
      const hasCached = queryClient.getQueryData(contactQueryKeys.byId(id))

      if (hasCached) continue

      queryClient.prefetchQuery(createGetContactByIdQuery({ id }))
    }
  }, [ids, queryClient])
}

export function useContactsCache() {
  const queryClient = useQueryClient()

  const getSearch = useCallback(
    (query?: string) => {
      return queryClient.getQueryData(contactQueryKeys.search(query))
    },
    [queryClient]
  )

  const getById = useCallback(
    (id?: string) => {
      return queryClient.getQueryData(contactQueryKeys.byId(id))
    },
    [queryClient]
  )

  return { getSearch, getById }
}
