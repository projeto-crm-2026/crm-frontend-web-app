export const contactQueryKeys = {
  all: ['contacts'] as const,
  byId: (id?: string) => ['contacts', 'by-id', id] as const,
  search: (query?: string) => ['contacts', 'search', query] as const
}
