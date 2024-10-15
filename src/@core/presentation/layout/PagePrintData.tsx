import React, { FC } from 'react'

const PagePrintData: FC<{ data: Object }> = ({ data }) => {
  return (
    <pre className='border-[1px] shadow-sm p-5 mb-3 overflow-y-scroll max-h-[175px]'>
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}

export default PagePrintData
