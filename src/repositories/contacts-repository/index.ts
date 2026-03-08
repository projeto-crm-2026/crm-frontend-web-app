import { z } from 'zod'

import { Contact } from '../../domain/entities/contact'
import { api } from '../../instances/axios'
import {
  type Contact as ContactType,
  contactSchema
} from '../../types/entities/contact'
import type { CreateContactPayload, UpdateContactPayload } from './types'

export class ContactsRepository {
  public static async getAllContacts(): Promise<Contact[]> {
    const { data } = await api.get(`/v1/contacts`)
    return z
      .array(contactSchema)
      .parse(data)
      .map(contact => new Contact(contact))
  }

  public static async searchContacts(searchTerm: string): Promise<Contact[]> {
    const { data } = await api.get(`/v1/contacts/search?q=${searchTerm}`)
    return z
      .array(contactSchema)
      .parse(data)
      .map(contact => new Contact(contact))
  }

  public static async getContactById(id: string): Promise<Contact> {
    const { data } = await api.get<ContactType>(`/v1/contacts/${id}`)
    return new Contact(contactSchema.parse(data))
  }

  public static async getContactByEmail(email: string): Promise<Contact> {
    const { data } = await api.get<ContactType>(`/v1/contacts/email/${email}`)
    return new Contact(contactSchema.parse(data))
  }

  public static async createContact(
    payload: CreateContactPayload
  ): Promise<Contact> {
    const { data } = await api.post<ContactType>(`/v1/contacts`, payload)
    return new Contact(contactSchema.parse(data))
  }

  public static async updateContact(
    id: string,
    payload: UpdateContactPayload
  ): Promise<Contact> {
    const { data } = await api.patch<ContactType>(`/v1/contacts/${id}`, payload)
    return new Contact(contactSchema.parse(data))
  }

  public static async deleteContact(id: string): Promise<Contact> {
    const { data } = await api.delete<ContactType>(`/v1/contacts/${id}`)
    return new Contact(contactSchema.parse(data))
  }
}
