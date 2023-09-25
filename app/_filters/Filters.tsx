"use client"

import { useEffect, useState } from "react"
import { Filter, FilterState, Person, Recording } from "../types"
import RecordingsTable from "../_recordings/RecordingsTable"
import styles from "@/styles/page.module.scss"
import { filterRecordings, collectSelectedFilters } from "./filterLogic"
import { makeFilterState } from "./makeFilterState"
import { makeFilters } from "@/data/makeFilters"

export default function Filters({ allRecordings }: { allRecordings: Recording[] }) {
  const filterData = makeFilters(allRecordings)

  const [filteredRecordings, setFilteredRecordings] = useState<Recording[]>(allRecordings)
  const [filterState, setFilterState] = useState<FilterState>(makeFilterState(filterData) as FilterState)
  const [filterExpansions, setFilterExpansions] = useState<boolean[]>(filterData.map(() => false))

  function handleFilterClick(e: React.MouseEvent<HTMLElement>, filterCategory: keyof FilterState) {
    const filterOption = e.currentTarget.id.toLowerCase() as keyof FilterState[typeof filterCategory]

    setFilterState((prevState) => ({
      ...prevState,
      [filterCategory]: {
        ...prevState[filterCategory],
        [filterOption]: !prevState[filterCategory][filterOption],
      },
    }))
  }

  function handleListExpansionClick(index: number) {
    const newFilterExpansions = [...filterExpansions]
    newFilterExpansions[index] = !newFilterExpansions[index]
    setFilterExpansions(newFilterExpansions)
  }

  useEffect(() => {
    const selectedFilters = collectSelectedFilters(filterState)
    setFilteredRecordings(filterRecordings(allRecordings, selectedFilters))
  }, [filterState, allRecordings])

  return (
    <>
      <div className={styles.filtersWrapper}>
        {filterData.map((filter: Filter, filterIndex) => {
          return (
            <div key={filter.id} className={styles.filter}>
              {/* <div id={filter.id} className={styles.filterName}>
                {filter.name}
              </div> */}
              <div className={styles.listWrapper}>
                <ul className={styles.filterOptions}>
                  {filter.options.map((option: string | Person, i) => {
                    // TODO completely refactor rendering list items
                    if (i < 10 && !filterExpansions[filterIndex]) {
                      if (typeof option !== "string") {
                        if (option.lastName) {
                          const lastName = option.lastName.toLowerCase() as keyof FilterState[typeof filter.id]

                          return (
                            <li
                              key={option.lastName}
                              id={option.lastName}
                              className={`${styles.filterOption} ${
                                filterState[filter.id][lastName] ? styles.selected : ""
                              }`}
                              onClick={(e) => handleFilterClick(e, filter.id)}
                            >
                              {option.firstName} {option.lastName}{" "}
                            </li>
                          )
                        }
                        const firstName = option.firstName.toLowerCase() as keyof FilterState[typeof filter.id]

                        return (
                          <li
                            key={option.firstName}
                            id={option.firstName}
                            className={`${styles.filterOption} ${
                              filterState[filter.id][firstName] ? styles.selected : ""
                            }`}
                            onClick={(e) => handleFilterClick(e, filter.id)}
                          >
                            {option.firstName} {option.lastName}
                          </li>
                        )
                      }
                      const singleOption = option.toLowerCase() as keyof FilterState[typeof filter.id]
                      return (
                        <li
                          key={singleOption}
                          id={singleOption}
                          className={`${styles.filterOption} ${
                            filterState[filter.id][singleOption] ? styles.selected : ""
                          }`}
                          onClick={(e) => handleFilterClick(e, filter.id)}
                        >
                          {option}
                        </li>
                      )
                    } else if (filterExpansions[filterIndex]) {
                      if (typeof option !== "string") {
                        if (option.lastName) {
                          const lastName = option.lastName.toLowerCase() as keyof FilterState[typeof filter.id]

                          return (
                            <li
                              key={option.lastName}
                              id={option.lastName}
                              className={`${styles.filterOption} ${
                                filterState[filter.id][lastName] ? styles.selected : ""
                              }`}
                              onClick={(e) => handleFilterClick(e, filter.id)}
                            >
                              {option.firstName} {option.lastName}{" "}
                            </li>
                          )
                        }
                        const firstName = option.firstName.toLowerCase() as keyof FilterState[typeof filter.id]

                        return (
                          <li
                            key={option.firstName}
                            id={option.firstName}
                            className={`${styles.filterOption} ${
                              filterState[filter.id][firstName] ? styles.selected : ""
                            }`}
                            onClick={(e) => handleFilterClick(e, filter.id)}
                          >
                            {option.firstName} {option.lastName}
                          </li>
                        )
                      }
                      const singleOption = option.toLowerCase() as keyof FilterState[typeof filter.id]
                      return (
                        <li
                          key={singleOption}
                          id={singleOption}
                          className={`${styles.filterOption} ${
                            filterState[filter.id][singleOption] ? styles.selected : ""
                          }`}
                          onClick={(e) => handleFilterClick(e, filter.id)}
                        >
                          {option}
                        </li>
                      )
                    }
                  })}
                </ul>
                {filter.options.length > 10 ? (
                  <div className={styles.showHide} onClick={() => handleListExpansionClick(filterIndex)}>{`${
                    filterExpansions[filterIndex] ? "hide" : "more"
                  }`}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <RecordingsTable recordings={filteredRecordings} />
    </>
  )
}
