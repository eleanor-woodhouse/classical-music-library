"use client"

import { useEffect, useState } from "react"
import { Filter, FilterState, Person, Recording } from "../types"
import Recordings from "../_recordings/Recordings"
import styles from "@/styles/page.module.scss"
import { filterRecordings, collectSelectedFilters } from "./filterLogic"
import { makeFilterState } from "./makeFilterState"
import { makeFilters } from "@/data/makeFilters"

export default function Filters({ allRecordings }: { allRecordings: Recording[] }) {
  const filterData = makeFilters(allRecordings)

  const [filteredRecordings, setFilteredRecordings] = useState<Recording[]>(allRecordings)
  const [filterState, setFilterState] = useState<FilterState>(makeFilterState(filterData) as FilterState)

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

  useEffect(() => {
    const selectedFilters = collectSelectedFilters(filterState)
    setFilteredRecordings(filterRecordings(allRecordings, selectedFilters))
  }, [filterState, allRecordings])

  return (
    <>
      <div className={styles.filtersWrapper}>
        {filterData.map((filter: Filter) => {
          return (
            <div key={filter.id} className={styles.filter}>
              <div id={filter.id} className={styles.filterName}>
                {filter.name}
              </div>
              <ul className={styles.filterOptions}>
                {filter.options.map((option: string | Person) => {
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
                        className={`${styles.filterOption} ${filterState[filter.id][firstName] ? styles.selected : ""}`}
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
                })}
              </ul>
            </div>
          )
        })}
      </div>
      <Recordings recordings={filteredRecordings} />
    </>
  )
}
