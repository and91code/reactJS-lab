import React from 'react'

import { IUser } from '@/@core/domain/User'
import { PageBackAPP } from '@/@core/presentation/PageBack'
import PagePrintData from '@/@core/presentation/PagePrintData'
import PageTitle from '@/@core/presentation/PageTitle'
import { UserFormServer } from './_components/UserFormServer'
import { getUser, updateUser } from './actions'
import { UserFormClient } from './_components/UserFormClient'

interface PageIdProps {
  params: { id: string }
}

export default async function PageId(props: PageIdProps) {

  const currentId = props.params.id

  const data: Partial<IUser> = await getUser(currentId)

  const time = new Date().getTime()

  return (
    <>
      <PageTitle>Page APP | id: {currentId} | <span className='text-sm font-semibold text-black'>({time})</span></PageTitle>
      <PageBackAPP to='/route-app' />
      <PagePrintData data={data} />
      <UserFormClient user={data} updateUser={updateUser} />
      <UserFormServer user={data} updateUser={updateUser} />
    </>
  )
}
