import { apiUsers } from '@/@core/infra/api/user'
import PageTitle from '@/@core/presentation/PageTitle'
import { IUser } from '@/@core/domain/User'
import { Table } from './_components/table'

export const revalidate = 5

export default async function PageList() {
  let users: IUser[] = []

  try {
    const result = await apiUsers().get({
      options: {
        next: {
          revalidate: 2
        }
      }
    })
    result.data.map(el => users.push(el))
  } catch (error) {
    console.log('... error', (error as Error).message);
  }

  return (
    <>
      <PageTitle>Page APP</PageTitle>
      <Table data={users} />
    </>
  )
}
