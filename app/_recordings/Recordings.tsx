import { Recording } from "../types"
import styles from "@/styles/Recordings.module.scss"

export default function RecordingsTable({ recordings }: { recordings: Recording[] }) {
  return (
    <table className={styles.recordingsTable}>
      <thead>
        <tr>
          {/* TODO remove hard coding here? */}
          <th>Recording</th>
          <th className={styles.composer}>Composer</th>
          <th className={styles.performer}>Performer</th>
          <th className={styles.period}>Period</th>
          <th className={styles.size}>Size</th>
          <th className={styles.instrument}>Instrument</th>
        </tr>
      </thead>
      <tbody>
        {recordings.map((recording) => {
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
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
