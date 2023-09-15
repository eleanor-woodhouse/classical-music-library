import type { Metadata } from "next"
import "../styles/globals.scss"
import { Roboto_Condensed, Roboto_Mono, Roboto_Slab } from "next/font/google"
import localFont from "next/font/local"

export const metadata: Metadata = {
  title: "Eleanor's Classical Music Library",
  description: "for Eleanor and others to enjoy",
}

const king = localFont({ src: "../public/ABCFavorit/ABCFavorit-Light-Trial.woff" })

// const archivoNarrow = Archivo_Narrow({ subsets: ["latin"] })
// const roboto = Roboto_Condensed({ weight: "300", subsets: ["latin"] })
// const roboto = Roboto_Slab({ weight: "300", subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <body className={roboto.className}>{children}</body> */}
      <body className={king.className}>{children}</body>
    </html>
  )
}
