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
  const [selectedRecordId, setSelectedRecordId] = useState("")

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

  function handleRecordingClick(recordID: string) {
    const found = recordings.find((recording) => recording.id === recordID)
    if (found?.id === selectedRecordId) {
      setSelectedRecordId("")
    } else if (found) {
      setSelectedRecordId(recordID)
    }
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
            <>
              <tr
                key={recording.id}
                onClick={() => handleRecordingClick(recording.id)}
                className={selectedRecordId === recording.id ? "selected" : ""}
              >
                <td className={`${styles.name} ${selectedRecordId === recording.id ? styles.active : ""}`}>
                  {/* <a href={recording.urls.spotify} target="_blank" rel="noopener noreferrer"> */}
                  <div className={styles.nameCell}>{recording.name}</div>
                  {/* </a> */}
                </td>
                <td className={`${styles.composer} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {recording.composer.length > 1 ? (
                    recording.composer.map((singleComposer, i, everyComposer) => {
                      return (
                        <span className={styles.text} key={`${singleComposer.firstName}-${singleComposer.lastName}`}>
                          {i === everyComposer.length - 1 ? " & " : null}
                          {singleComposer.firstName}
                          {singleComposer.lastName ? ` ${singleComposer.lastName}` : null}
                          {everyComposer.length > 2 && i !== everyComposer.length - 1 ? ", " : null}
                        </span>
                      )
                    })
                  ) : (
                    <span className={styles.text}>
                      {recording.composer[0].firstName} {recording.composer[0].lastName}
                    </span>
                  )}
                </td>
                <td className={`${styles.performer} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {recording.performer.length > 1 ? (
                    recording.performer.map((singlePerformer, i, everyPerformer) => {
                      return (
                        <span className={styles.text} key={`${singlePerformer.firstName}-${singlePerformer.lastName}`}>
                          {i === everyPerformer.length - 1 ? " & " : null}
                          {singlePerformer.firstName}
                          {singlePerformer.lastName ? ` ${singlePerformer.lastName}` : null}
                          {everyPerformer.length > 2 && i !== everyPerformer.length - 1 ? ", " : null}
                        </span>
                      )
                    })
                  ) : (
                    <span className={styles.text}>
                      {recording.performer[0].firstName} {recording.performer[0].lastName}
                    </span>
                  )}
                </td>
                <td className={`${styles.period} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {recording.period.length > 1 ? (
                    recording.period.map((singlePeriod, i, allPeriods) => {
                      return (
                        <span key={singlePeriod} className={styles.text}>
                          {singlePeriod}
                          {i !== allPeriods.length - 1 ? "; " : null}
                        </span>
                      )
                    })
                  ) : (
                    <span className={styles.text}>{recording.period[0]}</span>
                  )}
                </td>
                <td className={`${styles.instruments} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {recording.instruments.length > 1 ? (
                    recording.instruments.map((singleInstrument, i, allInstruments) => {
                      return (
                        <span className={styles.text} key={singleInstrument}>
                          {singleInstrument}
                          {i !== allInstruments.length - 1 ? "; " : null}
                        </span>
                      )
                    })
                  ) : (
                    <span className={styles.text}>{recording.instruments[0]}</span>
                  )}
                </td>
                <td className={`${styles.size} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {recording.size.length > 1 ? (
                    recording.size.map((singleSize, i, allSizes) => {
                      return (
                        <span className={styles.text} key={singleSize}>
                          {singleSize}
                          {i !== allSizes.length - 1 ? "; " : null}
                        </span>
                      )
                    })
                  ) : (
                    <span className={styles.text}>{recording.size[0]}</span>
                  )}
                </td>
                <td className={`${styles.mood} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {recording.mood.length > 1 ? (
                    recording.mood.map((singleMood, i, allMoods) => {
                      return (
                        <span key={singleMood} className={styles.text}>
                          {singleMood}
                          {i !== allMoods.length - 1 ? "; " : null}
                        </span>
                      )
                    })
                  ) : (
                    <span className={styles.text}>{recording.mood[0]}</span>
                  )}
                </td>
              </tr>
              {selectedRecordId === recording.id ? (
                <tr className={styles.detailsRow}>
                  <td colSpan={7}>
                    <div className={styles.detailsContainer}>
                      <div className={styles.details}></div>
                      <img src={recording.urls.image} className={styles.albumImage} />
                    </div>
                  </td>
                </tr>
              ) : (
                <></>
              )}
            </>
          )
        })}
      </tbody>
    </table>
  )
}
