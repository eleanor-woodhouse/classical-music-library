import localFont from "next/font/local"

const arizona = localFont({ src: "../../public/ABCFavorit/ABCArizonaSerif-Light-Trial.woff" })

export default function Header() {
  return (
    <header>
      {" "}
      <h1 className={arizona.className}>Eleanor&apos;s Classical Music Library</h1>
    </header>
  )
}
