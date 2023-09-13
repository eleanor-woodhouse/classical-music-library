import { Filter, FilterState, Recording } from "../types"

// TODO construct a class instead?

export function makeFilterState(filterCategories: Filter[]): FilterState {
  let filterState = {} as FilterState

  filterCategories.forEach((category) => {
    filterState[category.id] = {}
  })

  return filterState
}
