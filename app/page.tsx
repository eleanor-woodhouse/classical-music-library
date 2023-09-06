"use client"

import styles from "@/styles/page.module.scss"
import filters from "./filterData"
import recordingsData from "./recordingsData"
import Recordings from "./Recordings"
import { useState } from "react"
import { Recording } from "./types"

export default function Home() {
  const [recordings, setRecordings] = useState(recordingsData as Recording[])
  return (
    <main>
      <header>
        {" "}
        <h1>ELEANOR&apos;S CLASSICAL MUSIC LIBRARY</h1>
      </header>
      <div className={styles.filtersWrapper}>
        {filters.map((filter) => {
          return (
            <>
              <div className={styles.filter}>
                <div className={styles.filterName}>{filter.name}</div>
                <ul className={styles.filterOptions}>
                  {filter.options.map((option) => {
                    if (typeof option !== "string") {
                      return (
                        <>
                          <li className={styles.filterOption}>
                            <span className={styles.filterSubOption}>contains only | </span>
                            {option.firstName} {option.lastName}{" "}
                            <span className={styles.filterSubOption}>| excluded</span>
                          </li>
                        </>
                      )
                    }
                    return (
                      <>
                        <li className={styles.filterOption}>
                          <span className={styles.filterSubOption}>contains only | </span>
                          {option} <span className={styles.filterSubOption}>| excluded</span>
                        </li>
                      </>
                    )
                  })}
                </ul>
              </div>
            </>
          )
        })}
      </div>
      <Recordings recordings={recordings} />
    </main>
  )
}
