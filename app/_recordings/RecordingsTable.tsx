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
    sortedField: "composer",
    direction: "ascending",
  })
  const [sortedRecordings, setSortedRecordings] = useState<Recording[]>(recordings)
  const [arrow, setArrow] = useState({
    name: "",
    composer: "ascending",
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
    setSelectedRecordId(recordID === selectedRecordId ? "" : recordID)
  }

  useEffect(() => {
    setSortedRecordings(sortRecords(sortConfig, recordings))
  }, [sortConfig, recordings])

  const renderText = (textArray: string[]) =>
    textArray.length > 1 ? (
      textArray.map((text, index, array) => (
        <span key={text} className={styles.text}>
          {text}
          {index !== array.length - 1 ? "; " : null}
        </span>
      ))
    ) : (
      <span className={styles.text}>{textArray[0]}</span>
    )

  // TODO remove hard coded values
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
                  <div className={styles.nameCell}>{recording.name}</div>
                </td>
                <td className={`${styles.composer} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {renderText(recording.composer.map((c) => `${c.firstName}${c.lastName ? ` ${c.lastName}` : ""}`))}
                </td>
                <td className={`${styles.performer} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {renderText(recording.performer.map((p) => `${p.firstName}${p.lastName ? ` ${p.lastName}` : ""}`))}
                </td>
                <td className={`${styles.period} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {renderText(recording.period)}
                </td>
                <td className={`${styles.instruments} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {renderText(recording.instruments)}
                </td>
                <td className={`${styles.size} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {renderText(recording.size)}
                </td>
                <td className={`${styles.mood} ${selectedRecordId === recording.id ? styles.selected : ""}`}>
                  {renderText(recording.mood)}
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
