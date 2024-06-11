import React from 'react'
import { useRouter } from 'next/router'

import { IUser } from '@/@core/domain/User'
import { apiUsers } from '@/@core/infra/api/user'
import UserTable from '@/@core/presentation/UserTable'
import PageTitle from '@/@core/presentation/PageTitle'

interface PageProps { users: IUser[] }

export default function PageList(props: PageProps) {
  const route = useRouter()

  const onClickEdit = (id: number) => {
    route.push(`/route-ssr/${id}`)
  }

  return (
    <div>
      <PageTitle>Page SSR</PageTitle>
      <UserTable data={props?.users ?? []} onClickEdit={onClickEdit} />
    </div>
  )
}


export const getServerSideProps = async () => {
  const props: PageProps = {
    users: []
  }

  try {
    const result = await apiUsers().get()
    result.data?.map(el => props.users.push(el))

  } catch (error) {
    console.log('... error', (error as Error).message);
  }

  return { 
    props,
   }
}