'use client'

import { IUser } from '@/@core/domain/User'
import UserTable from '@/@core/presentation/UserTable'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Table = ({ data }: { data: IUser[] }) => {
  const route = useRouter()

  const onClickEdit = (id: number) => {
    route.push(`/route-app/${id}`)
  }

  return (
    <UserTable data={data} onClickEdit={onClickEdit} />
  )
}