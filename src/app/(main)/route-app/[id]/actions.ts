'use server'

import { IUser } from "@/@core/domain/User"
import { apiUsers } from "@/@core/infra/api/user"
import { revalidatePath } from "next/cache"

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

export async function updateUser(value: FormData) {

  const fieldName = value.get('name')

  if (fieldName === 'maria') {
    throw new Error('... maria')
  }

  const payload: IUser = {
    id: Number(value.get('id')),
    name: String(value.get('name')),
    username: String(value.get('username')),
    email: String(value.get('email')),
  }

  const result = await apiUsers().update({ payload })

  if (!result.ok) {
    throw new Error('Erro ao atualizar usuário')
  }
  revalidatePath('/route-app')
  revalidatePath(`/route-app/${payload.id}`)
}