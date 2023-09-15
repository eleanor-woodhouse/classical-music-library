import { Filter, Person, Recording } from "@/app/types"
import { categories } from "./filterCategories"

export function makeFilters(recordingsData: Recording[]): Filter[] {
  return categories.map((category) => {
    let optionsSet = new Set<any>()

    let rawOptionSet = [] as Person[]

    const singleFilter = {
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      options: {} as Filter["options"],
    }

    recordingsData.forEach((recording) => {
      const categoryOptions = recording[category] as Filter["options"]
      categoryOptions.forEach((option) => {
        if (typeof option === "object") {
          rawOptionSet.push(option)
          if (!option.lastName) {
            optionsSet.add(option.firstName)
          }
          optionsSet.add(option.lastName)
        } else if (typeof option === "string") {
          optionsSet.add(option)
        }
      })
    })

    const optionsAsStrings: string[] = Array.from(optionsSet)

    if (rawOptionSet[0]) {
      const options = optionsAsStrings.map((option) => {
        return rawOptionSet.find((rawOption) => {
          if (!rawOption.lastName) {
            return option === rawOption.firstName
          }
          return option === rawOption.lastName
        })
      }) as Person[] | undefined[]

      singleFilter.options = filterOptions(options)

      singleFilter.options.sort((a, b) => {
        if (isPerson(a) && isPerson(b)) {
          if (!a.lastName && !b.lastName) {
            return a.firstName > b.firstName ? 1 : -1
          } else if (!a.lastName && b.lastName) {
            return a.firstName > b.lastName ? 1 : -1
          } else if (a.lastName && !b.lastName) {
            return a.lastName > b.firstName ? 1 : -1
          } else {
            return a.lastName > b.lastName ? 1 : -1
          }
        } else {
          return 0
        }
      })

      return singleFilter
    }

    singleFilter.options = optionsAsStrings

    singleFilter.options.sort()

    return singleFilter
  })
}

// Necessary as a typescript typing workaround
function filterOptions(options: Person[] | undefined[]): Person[] | string[] {
  return options.filter((option) => option !== undefined) as Person[]
}

export function isPerson(option: string | Person): option is Person {
  return typeof option !== "string"
}
