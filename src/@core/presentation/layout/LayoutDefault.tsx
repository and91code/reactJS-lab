import React, { ReactNode } from 'react'
import Link from "next/link";

import { mapLinks } from "@/@core/content/routeLink";

export default function LayoutDefault({ children }: { children: ReactNode }) {
  return (
    <div className='w-full max-w-2xl mx-auto'>

      <div className="my-3 flex flex-col sm:flex-row flex-wrap justify-between">
        <Link href='/' className='text-3xl'>LayoutDefault</Link>

        <ul className='m-0 p-0 flex items-center gap-2'>
          {mapLinks.map(link =>
            <Link key={link.label} href={link.to} className='border p-1 rounded text-xs uppercase'>{link.label}</Link>
          )}
        </ul>
      </div>

      {children}
    </div>
  )
}
