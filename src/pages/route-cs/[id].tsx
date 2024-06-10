import { IUser } from '@/@core/domain/User'
import { apiUsers } from '@/@core/infra/api/user'
import { PageBackCS } from '@/@core/presentation/PageBack'
import PagePrintData from '@/@core/presentation/PagePrintData'
import PageTitle from '@/@core/presentation/PageTitle'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

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

  return (
    <>
      <PageTitle>Page CS | id: {currentId}</PageTitle>
      <PageBackCS to='/route-cs' />
      <PagePrintData data={data} />
    </>
  )
}
