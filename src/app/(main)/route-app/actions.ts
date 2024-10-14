import { apiUsers } from "@/@core/infra/api/user"

export async function getUsers() {
  try {
    const result = await apiUsers().get({
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