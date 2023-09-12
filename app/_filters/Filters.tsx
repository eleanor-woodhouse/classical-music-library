"use client"

import { useEffect, useState } from "react"
import { Filter, FilterState, Person, Recording } from "../types"
import filterData from "../../data/filterData"
import Recordings from "../_recordings/Recordings"
import styles from "@/styles/page.module.scss"
import { filterRecordings, collectSelectedFilters } from "./filterLogic"

export default function Filters({ allRecordings }: { allRecordings: Recording[] }) {
  const [filteredRecordings, setFilteredRecordings] = useState(allRecordings as Recording[])
  // TODO construct this filter object dynamically from filter schema (class constructor)
  // useState(makeSelectedFiltersState(allRecordings))
  const [filterState, setFilterState] = useState<FilterState>({
    instruments: {
      piano: false,
      strings: false,
      voice: false,
      orchestra: false,
    },
    composer: {
      chopin: false,
      grieg: false,
      liszt: false,
      schubert: false,
      debussy: false,
      ravel: false,
    },
    period: {
      romantic: false,
      impressionist: false,
      classical: false,
    },
  })

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
    const filterCategoriesList = Object.keys(filterState) as (keyof FilterState)[]

    const selectedFilters = collectSelectedFilters(filterState, filterCategoriesList)

    setFilteredRecordings(filterRecordings(allRecordings, filterCategoriesList, selectedFilters))
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
                    const lastName = option.lastName.toLowerCase() as keyof FilterState[typeof filter.id]

                    return (
                      <li
                        key={option.lastName}
                        id={option.lastName}
                        className={`${styles.filterOption} ${filterState[filter.id][lastName] ? styles.selected : ""}`}
                        onClick={(e) => handleFilterClick(e, filter.id)}
                      >
                        <span className={styles.filterSubOption}>contains only | </span>
                        {option.firstName} {option.lastName} <span className={styles.filterSubOption}>| excluded</span>
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
                      <span className={styles.filterSubOption}>contains only | </span>
                      {option} <span className={styles.filterSubOption}>| excluded</span>
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
