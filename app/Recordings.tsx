import { Recording } from "./types"
import styles from "@/styles/Recordings.module.scss"

export default function Recordings({ recordings }: { recordings: Recording[] }) {
  return (
    <>
      <table className={styles.recordingsTable}>
        <thead>
          <tr>
            <th>Recording</th>
            <th className={styles.composer}>Composer</th>
            <th className={styles.performer}>Performer</th>
            <th className={styles.period}>Period</th>
          </tr>
        </thead>
        <tbody>
          {recordings.map((recording) => {
            return (
              <tr key={recording.id}>
                <td>
                  <a href={recording.url}>{recording.name}</a>
                </td>
                <td className={styles.composer}>
                  {recording.composer.length > 1 ? (
                    recording.composer.map((singleComposer) => {
                      return (
                        <span key={singleComposer.lastName}>
                          {singleComposer.firstName} {singleComposer.lastName}
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
                    recording.performer.map((singlePerformer) => {
                      return (
                        <span key={singlePerformer.lastName}>
                          {singlePerformer.firstName} {singlePerformer.lastName}
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
                    recording.period.map((singlePeriod) => {
                      return <span key={singlePeriod}>{singlePeriod} </span>
                    })
                  ) : (
                    <span>{recording.period[0]}</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
