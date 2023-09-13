import { categories } from "@/data/filterCategories"
import { Recording, FilterState, SelectedFilters } from "../types"

export function filterRecordings(everyRecording: Recording[], filtersToApply: SelectedFilters) {
  const filteredRecs = everyRecording.filter((recording) => {
    const returnedCategories = categories.every((category) => {
      if (!filtersToApply[category].length) return true
      // COMMENTS ARE FOR IF ANY OF THE CATEGORIES ARE NOT ARRAYS
      // if (Array.isArray(recording[category])) {
      if (category === "composer" || category === "performer") {
        return recording[category].some((option) => {
          if (typeof option != "string") {
            if (option.lastName) {
              return filtersToApply[category].includes(option.lastName.toLowerCase())
            }
            return filtersToApply[category].includes(option.firstName.toLowerCase())
          }
        })
      }

      return recording[category].some((option) => {
        if (typeof option === "string") {
          return filtersToApply[category].includes(option.toLowerCase())
        }
      })

      // }
      // return filtersToApply[category].includes(recording[category])
    })

    return returnedCategories
  })

  return filteredRecs
}

export function collectSelectedFilters(filterState: FilterState) {
  let selectedFilters = {} as SelectedFilters

  categories.forEach((category: keyof FilterState) => {
    selectedFilters[category] = []
    const filterOptions = Object.keys(filterState[category]) as (keyof FilterState[typeof category])[]

    filterOptions.forEach((option: keyof FilterState[typeof category]) => {
      if (filterState[category][option]) {
        selectedFilters[category as keyof FilterState].push(option)
      }
    })
  })

  return selectedFilters
}
