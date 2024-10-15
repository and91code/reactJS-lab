import React, { ReactNode } from 'react'
import Link from "next/link";

import { mapLinks } from "@/@core/content/routeLink";

export default function LayoutDefault({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="shadow">
        <div className="w-container h-12 flex items-center justify-between mb-4">
          <Link href='/' className="font-bold text-zinc-800 hover:text-zinc-500 duration-200">
            Home
          </Link>

          <ul className='m-0 p-0 flex items-center gap-1'>
            {mapLinks.map(link =>
              <Link
                key={link.label}
                href={link.to}
                className='border py-1 px-3 rounded text-xs uppercase text-zinc-800 hover:text-zinc-100 hover:bg-gray-800 duration-200'
              >
                {link.label}
              </Link>
            )}
          </ul>
        </div>
      </header>

      <main className="w-container">
        {children}
      </main>
    </>
  )
}
