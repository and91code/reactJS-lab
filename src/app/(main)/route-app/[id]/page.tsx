import React from 'react'

import { IUser } from '@/@core/domain/User'
import { apiUsers } from '@/@core/infra/api/user'
import { PageBackAPP } from '@/@core/presentation/PageBack'
import PagePrintData from '@/@core/presentation/PagePrintData'
import PageTitle from '@/@core/presentation/PageTitle'

interface PageIdProps {
  params: { id: string }
}
export default async function PageId(props: PageIdProps) {
  let data: Partial<IUser> = {}

  const currentId = Number(props.params.id)

  try {
    const result = await apiUsers().getId({
      payload: { id: Number(currentId) },
      options: {
        cache: 'force-cache',
      }
    })
    data = result.data
  } catch (error) {
    console.log('... error', (error as Error).message);
  }

  return (
    <>
      <PageTitle>Page APP | id: {currentId}</PageTitle>
      <PageBackAPP to='/route-app' />
      <PagePrintData data={data} />
    </>
  )
}
