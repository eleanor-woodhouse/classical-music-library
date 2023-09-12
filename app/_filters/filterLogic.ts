import { Recording, FilterState, SelectedFilters } from "../types"

export function filterRecordings(
  everyRecording: Recording[],
  categories: (keyof FilterState)[],
  filtersToApply: SelectedFilters,
) {
  return everyRecording.filter((recording) => {
    return categories.every((category) => {
      if (!filtersToApply[category].length) return true
      // COMMENTS ARE FOR IF ANY OF THE CATEGORIES ARE NOT ARRAYS
      // if (Array.isArray(recording[category])) {
      if (category === "composer") {
        return recording[category].some((option) => filtersToApply[category].includes(option.lastName.toLowerCase()))
      }
      return recording[category].some((option) => filtersToApply[category].includes(option.toLowerCase()))
      // }
      // return filtersToApply[category].includes(recording[category])
    })
  })
}

export function collectSelectedFilters(filterState: FilterState, filterCategories: (keyof FilterState)[]) {
  let selectedFilters: SelectedFilters = {
    instruments: [],
    composer: [],
    period: [],
  }

  filterCategories.forEach((category: keyof FilterState) => {
    const filterOptions = Object.keys(filterState[category]) as (keyof FilterState[typeof category])[]

    filterOptions.forEach((option: keyof FilterState[typeof category]) => {
      if (filterState[category][option]) {
        selectedFilters[category as keyof FilterState].push(option)
      }
    })
  })

  return selectedFilters
}
