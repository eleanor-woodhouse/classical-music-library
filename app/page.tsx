import Header from "./_components/Header"
import Filters from "./_filters/Filters"
import { getRecordings } from "../data/getRecordings"

export default async function Home() {
  const recordings = await getRecordings()
  return (
    <main>
      <Header />
      <Filters allRecordings={recordings} />
    </main>
  )
}
