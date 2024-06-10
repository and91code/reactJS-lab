import React from 'react'
import { GetServerSidePropsContext } from 'next'

import { IUser } from '@/@core/domain/User'
import { apiUsers } from '@/@core/infra/api/user'
import { PageBackSSR } from '@/@core/presentation/PageBack'
import PagePrintData from '@/@core/presentation/PagePrintData'
import PageTitle from '@/@core/presentation/PageTitle'

interface PageProps {
  currentId: number | null
  user: Partial<IUser>
}

export default function PageId(props: PageProps) {
  return (
    <>
      <PageTitle>Page SSR | id: {props.currentId}</PageTitle>
      <PageBackSSR to='/route-ssr' />
      <PagePrintData data={props.user} />
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const currentId = Number(ctx.query.id)

  const props: PageProps = {
    currentId: currentId,
    user: {}
  }

  try {
    const data = await apiUsers().getId({
      payload: {
        id: Number(currentId)
      }
    })
    props.user = data.data
  } catch (error) {
    console.log('... error', (error as Error).message);
  }

  return { props }
}