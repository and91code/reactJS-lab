import { ReactNode } from "react";
import Link from "next/link";

import { mapLinks } from "@/@core/content/routeLink";

export default function Home() {
  return (
    <main className="min-h-screen min-w-screen flex">
      <LinkRoot>
        {mapLinks.map(link => <LinkItem key={link.label} {...link} />)}
      </LinkRoot>
    </main>
  );
}

const LinkRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div className="m-auto sm:grid grid-cols-3 gap-x-2 w-full max-w-2xl p-2">
      {children}
    </div>
  )
}
const LinkItem = ({ label, desc, to }: { label: string, desc: string, to: string }) => {
  return (
    <div className="border-2 border-gray-500 rounded p-4 shadown shadown-gray-500 flex flex-col gap-2">
      <LinkLabel label={label} />
      <LinkDesc desc={desc} />
      <LinkTo to={to} />
    </div>
  )
}
const LinkLabel = ({ label }: { label: string }) => {
  return (
    <p
      className="text-3xl text-gray-800 font-bold">
      {label}
    </p>
  )
}
const LinkDesc = ({ desc }: { desc: string }) => {
  return (
    <span
      className="text-sm text-gray-500 italic">
      {desc}
    </span>
  )
}
const LinkTo = ({ to }: { to: string }) => {
  return (
    <Link
      href={to}
      target="_blank"
      className="border p-0.5 rounded text-xs capitalize"
    >
      ver mais
    </Link>
  )
}