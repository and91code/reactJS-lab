import { apiUsers } from '@/@core/infra/api/user'
import PageTitle from '@/@core/presentation/PageTitle'
import { IUser } from '@/@core/domain/User'
import { Table } from './_components/table'
import { getUsers } from './actions'

export const revalidate = 5

export default async function PageList() {
  
  const users: IUser[] = await getUsers()

  return (
    <>
      <PageTitle>Page APP</PageTitle>
      <Table data={users} />
    </>
  )
}
