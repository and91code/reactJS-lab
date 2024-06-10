import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { IUser } from '@/@core/domain/User'
import { apiUsers } from '@/@core/infra/api/user'
import UserTable from '@/@core/presentation/UserTable'
import PageTitle from '@/@core/presentation/PageTitle'

export default function PageList() {
  const route = useRouter()
  const [users, setUsers] = useState<IUser[]>([])

  const fetchData = async () => {
    try {
      const data = await apiUsers().get()
      setUsers(data.data)
    } catch (error) {
      console.log('... error', (error as Error).message);
    }
  }

  const onClickEdit = (id: number) => {
    route.push(`/route-cs/${id}`)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <PageTitle>Page CS</PageTitle>
      <UserTable data={users} onClickEdit={onClickEdit} />
    </div>
  )
}
