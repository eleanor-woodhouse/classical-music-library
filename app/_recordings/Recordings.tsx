import { useEffect, useState } from "react"
import { Filter, Recording } from "../types"
import styles from "@/styles/Recordings.module.scss"
import { sortRecords } from "./helpers"

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

  function handleClick(filter: Filter["id"] | "name") {
    let direction = "ascending"
    if (sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ sortedField: filter, direction })
    refreshArrow(filter, direction)
  }

  function refreshArrow(filter: string, direction: string) {
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

  useEffect(() => {
    setSortedRecordings(sortRecords(sortConfig, recordings))
  }, [sortConfig, recordings])

  const headers: (Filter["id"] | "name")[] = ["name", "composer", "performer", "period", "size", "instruments", "mood"]

  return (
    <table className={styles.recordingsTable}>
      <thead>
        <tr>
          {headers.map((header) => {
            const headerTitle = header.charAt(0).toUpperCase() + header.slice(1)
            return (
              <th key={header} className={`${styles.tableHeader} ${styles[header]}`}>
                <button className={styles.headerButton} onClick={() => handleClick(header)}>
                  <div className={styles.tableHeaderWrapper}>{headerTitle}</div>
                  <svg
                    className={`${styles.headerArrow} ${styles[arrow[header]]}`}
                    fill="#000000"
                    height="13px"
                    width="13px"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 407.437 407.437"
                    xmlSpace="preserve"
                  >
                    <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 " />
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
              <td>
                <a href={recording.urls.spotify}>{recording.name}</a>
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
              <td className={styles.instrument}>
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
