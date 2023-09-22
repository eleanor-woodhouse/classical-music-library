import { useEffect, useState } from "react"
import { Filter, Recording } from "../types"
import styles from "@/styles/Recordings.module.scss"
import { sortRecords } from "./helpers"
import localFont from "next/font/local"

const compModern = localFont({ src: "../../public/cmunci.woff" })

export default function RecordingsTable({ recordings }: { recordings: Recording[] }) {
  const [sortConfig, setSortConfig] = useState<{
    sortedField: Filter["id"] | "name" | null
    direction: string
  }>({
    sortedField: null,
    direction: "",
  })
  const [sortedRecordings, setSortedRecordings] = useState<Recording[]>(recordings)
  const [arrow, setArrow] = useState({
    name: "",
    composer: "",
    performer: "",
    period: "",
    size: "",
    instruments: "",
    mood: "",
  })
  const [albumVisible, setAlbumVisible] = useState(false)
  const [visibleAlbumId, setVisibleAlbumId] = useState("")
  const [albumImageUrl, setAlbumImageUrl] = useState("")

  function handleClick(filter: Filter["id"] | "name") {
    let direction = "ascending"
    if (sortConfig.direction === "ascending" && sortConfig.sortedField === filter) {
      direction = "descending"
    }
    setSortConfig({ sortedField: filter, direction })
    // refreshArrow(filter, direction)
    setArrow({
      name: "",
      composer: "",
      performer: "",
      period: "",
      size: "",
      instruments: "",
      mood: "",
      [filter]: direction,
    })
  }

  function handleMouseEnter(recordID: string) {
    const found = recordings.find((recording) => recording.id === recordID)
    if (found) {
      setAlbumImageUrl(found.urls.image)
      setVisibleAlbumId(recordID)
      setAlbumVisible(true)
    }
  }

  function handleMouseLeave() {
    setAlbumVisible(false)
  }

  useEffect(() => {
    setSortedRecordings(sortRecords(sortConfig, recordings))
  }, [sortConfig, recordings])

  const headers: (Filter["id"] | "name")[] = ["name", "composer", "performer", "period", "instruments", "size", "mood"]

  return (
    <table className={styles.recordingsTable}>
      <thead>
        <tr className={"headerRow"}>
          {headers.map((header) => {
            const headerTitle = header.charAt(0).toUpperCase() + header.slice(1)
            return (
              <th key={header} className={`${styles.tableHeader} ${styles[header]}`}>
                <button className={styles.headerButton} onClick={() => handleClick(header)}>
                  <div className={`${styles.tableHeaderText} ${compModern.className}`}>{headerTitle}</div>
                  <svg
                    className={`${styles.headerArrow} ${styles[arrow[header]]}`}
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z" />
                  </svg>
                </button>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {sortedRecordings.map((recording) => {
          return (
            <tr key={recording.id}>
              <td
                className={styles.name}
                onMouseEnter={() => handleMouseEnter(recording.id)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <a href={recording.urls.spotify} target="_blank" rel="noopener noreferrer">
                  <div className={styles.nameCell}>{recording.name}</div>
                </a>
                {albumVisible && visibleAlbumId === recording.id && (
                  <div className={styles.floatingImage}>
                    <img src={albumImageUrl} className={styles.albumImage} />
                  </div>
                )}
              </td>
              <td className={styles.composer}>
                {recording.composer.length > 1 ? (
                  recording.composer.map((singleComposer, i, everyComposer) => {
                    return (
                      <span key={`${singleComposer.firstName}-${singleComposer.lastName}`}>
                        {i === everyComposer.length - 1 ? " & " : null}
                        {singleComposer.firstName}
                        {singleComposer.lastName ? ` ${singleComposer.lastName}` : null}
                        {everyComposer.length > 2 && i !== everyComposer.length - 1 ? ", " : null}
                      </span>
                    )
                  })
                ) : (
                  <span>
                    {recording.composer[0].firstName} {recording.composer[0].lastName}
                  </span>
                )}
              </td>
              <td className={styles.performer}>
                {recording.performer.length > 1 ? (
                  recording.performer.map((singlePerformer, i, everyPerformer) => {
                    return (
                      <span key={`${singlePerformer.firstName}-${singlePerformer.lastName}`}>
                        {i === everyPerformer.length - 1 ? " & " : null}
                        {singlePerformer.firstName}
                        {singlePerformer.lastName ? ` ${singlePerformer.lastName}` : null}
                        {everyPerformer.length > 2 && i !== everyPerformer.length - 1 ? ", " : null}
                      </span>
                    )
                  })
                ) : (
                  <span>
                    {recording.performer[0].firstName} {recording.performer[0].lastName}
                  </span>
                )}
              </td>
              <td className={styles.period}>
                {recording.period.length > 1 ? (
                  recording.period.map((singlePeriod, i, allPeriods) => {
                    return (
                      <span key={singlePeriod}>
                        {singlePeriod}
                        {i !== allPeriods.length - 1 ? "; " : null}
                      </span>
                    )
                  })
                ) : (
                  <span>{recording.period[0]}</span>
                )}
              </td>
              <td className={styles.instruments}>
                {recording.instruments.length > 1 ? (
                  recording.instruments.map((singleInstrument, i, allInstruments) => {
                    return (
                      <span key={singleInstrument}>
                        {singleInstrument}
                        {i !== allInstruments.length - 1 ? "; " : null}
                      </span>
                    )
                  })
                ) : (
                  <span>{recording.instruments[0]}</span>
                )}
              </td>
              <td className={styles.size}>
                {recording.size.length > 1 ? (
                  recording.size.map((singleSize, i, allSizes) => {
                    return (
                      <span key={singleSize}>
                        {singleSize}
                        {i !== allSizes.length - 1 ? "; " : null}
                      </span>
                    )
                  })
                ) : (
                  <span>{recording.size[0]}</span>
                )}
              </td>
              <td className={styles.mood}>
                {recording.mood.length > 1 ? (
                  recording.mood.map((singleMood, i, allMoods) => {
                    return (
                      <span key={singleMood}>
                        {singleMood}
                        {i !== allMoods.length - 1 ? "; " : null}
                      </span>
                    )
                  })
                ) : (
                  <span>{recording.mood[0]}</span>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
