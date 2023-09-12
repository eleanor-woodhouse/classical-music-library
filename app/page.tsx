import Header from "./_components/Header"
import Filters from "./_filters/Filters"
import { recordingsData } from "./_recordings/recordingsData"

export default async function Home() {
  // const recordings = await getRecordings()
  return (
    <main>
      <Header />
      <Filters allRecordings={recordingsData} />
    </main>
  )
}
