import React from 'react'

import { getUser } from '@/actions/get-user'
import { updateUser } from '@/actions/update-user'
import { IUser } from '@/@core/domain/User'
import { PageBackAPP } from '@/@core/presentation/layout/PageBack'
import PagePrintData from '@/@core/presentation/layout/PagePrintData'
import PageTitle from '@/@core/presentation/layout/PageTitle'

import { UserFormServer } from '@/@core/presentation/components/UserFormServer'
import { UserFormClient } from '@/@core/presentation/components/UserFormClient'

interface PageIdProps {
  params: { id: string }
}

export default async function PageId(props: PageIdProps) {
  const currentId = props.params.id
  const data: Partial<IUser> = await getUser(currentId)

  return (
    <>
      <PageTitle>Page APP | id: {currentId}</PageTitle>
      <PageBackAPP to='/route-app' />

      <p className='text-sm font-semibold text-black my-3'>{new Date().getTime()}</p>

      <PagePrintData data={data} />
      <UserFormClient user={data} updateUser={updateUser} />
      <UserFormServer user={data} updateUser={updateUser} />
    </>
  )
}
