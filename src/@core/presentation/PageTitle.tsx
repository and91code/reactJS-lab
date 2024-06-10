import React, { ReactNode } from 'react'

const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className='block text-2xl uppercase text-gray-500 mb-5'>
      {children}
    </h2>
  )
}

export default PageTitle
