import type { Metadata } from "next"
import "../styles/globals.scss"
import { Roboto_Condensed } from "next/font/google"

export const metadata: Metadata = {
  title: "Eleanor's Classical Music Library",
  description: "for Eleanor and others to enjoy",
}

// const archivoNarrow = Archivo_Narrow({ subsets: ["latin"] })
const roboto = Roboto_Condensed({ weight: "300", subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
