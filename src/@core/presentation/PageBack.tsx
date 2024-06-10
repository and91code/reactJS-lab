'use client'

import React from 'react'
import { useRouter as useRouterROUTER } from 'next/router'
import { useRouter as useRouterNAVIFATION } from 'next/navigation'

const Base = (props: { onClick: () => void }) => {
  return (
    <button
      className='border-[1px] text-gray-500 duration-150 hover:text-gray-800 hover:bg-gray-100 text-xs p-1 rounded mb-2'
      {...props}
    >
      Voltar
    </button>
  )
}

export const PageBackCS = ({ to }: { to: string }) => {
  const route = useRouterROUTER()
  return <Base onClick={() => route.push(to)} />
}
export const PageBackSSR = ({ to }: { to: string }) => {
  const route = useRouterROUTER()
  return <Base onClick={() => route.push(to)} />
}
export const PageBackAPP = ({ to }: { to: string }) => {
  const route = useRouterNAVIFATION()
  return <Base onClick={() => route.push(to)} />
}
