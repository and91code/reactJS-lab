'use server'

import { apiUsers } from "@/@core/infra/api/user"

export async function getUser(currentId: string) {
  try {
    const result = await apiUsers().getId({
      payload: { id: Number(currentId) },
      options: {
        cache: 'force-cache',
      }
    })

    if (!result.ok) {
      throw new Error('Erro ao buscar usuário')
    }

    return result.data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}