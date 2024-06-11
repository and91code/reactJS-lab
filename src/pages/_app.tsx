import type { AppProps } from 'next/app'
import { Inter } from "next/font/google";
import "@/app/globals.css";

import LayoutDefault from '@/@core/presentation/layout/LayoutDefault'

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
      />
      
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

      <LayoutDefault>
        <Component {...pageProps} />
      </LayoutDefault>
    </>
  )
}