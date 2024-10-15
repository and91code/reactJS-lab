import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { IUser } from '@/@core/domain/User'
import { apiUsers } from '@/@core/infra/api/user'
import { UserFormClient } from '@/@core/presentation/components/UserFormClient'
import { PageBackCS } from '@/@core/presentation/layout/PageBack'
import PagePrintData from '@/@core/presentation/layout/PagePrintData'
import PageTitle from '@/@core/presentation/layout/PageTitle'

export default function PageId() {
  const route = useRouter()
  const [data, setData] = useState<Partial<IUser>>({})

  const currentId = route.query.id as string

  const fetchData = async () => {
    try {
      const data = await apiUsers().getId({
        payload: {
          id: Number(currentId)
        }
      })
      setData(data.data)
    } catch (error) {
      console.log('... error', (error as Error).message);
    }
  }

  useEffect(() => {
    if (!!route.query.id && Number.isInteger(+route.query.id))
      fetchData()
  }, [])

  const handleUpdate = async (value: FormData) => {
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

    fetchData()
  }

  return (
    <>
      <PageTitle>Page CS | id: {currentId}</PageTitle>
      <PageBackCS to='/route-cs' />
      <PagePrintData data={data} />

      <UserFormClient user={data} updateUser={handleUpdate} />
    </>
  )
}
