import localFont from "next/font/local"

// const arizona = localFont({ src: "../../public/ABCFavorit/ABCArizonaSerif-Light-Trial.woff" })
const compModern = localFont({ src: "../../public/cmunci.woff" })

export default function Header() {
  return (
    <header>
      {" "}
      <h1 className={compModern.className}>Eleanor&apos;s Classical Music Library</h1>
    </header>
  )
}
