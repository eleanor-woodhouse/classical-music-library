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
        }
        return 0
      })

      return singleFilter
    }

    singleFilter.options = optionsAsStrings

    if (category === "size") {
      singleFilter.options.sort((a, b) => {
        const sizeOrder = {
          solo: 1,
          duet: 2,
          trio: 3,
          quartet: 4,
          quintet: 5,
          sextet: 6,
          choir: 7,
          opera: 8,
          orchestra: 9,
        }
        const firstValue = a.toLowerCase() as keyof typeof sizeOrder
        const secondValue = b.toLowerCase() as keyof typeof sizeOrder

        if (sizeOrder[firstValue] < sizeOrder[secondValue]) {
          return -1
        }
        if (sizeOrder[firstValue] > sizeOrder[secondValue]) {
          return 1
        }
        return 0
      })
      return singleFilter
    }

    if (category === "period") {
      singleFilter.options.sort((a, b) => {
        const periodOrder = {
          baroque: 1,
          classical: 2,
          romantic: 3,
          impressionist: 4,
          ["early modern"]: 5,
          ["20th century"]: 6,
        }
        const firstValue = a.toLowerCase() as keyof typeof periodOrder
        const secondValue = b.toLowerCase() as keyof typeof periodOrder

        if (periodOrder[firstValue] < periodOrder[secondValue]) {
          return -1
        }
        if (periodOrder[firstValue] > periodOrder[secondValue]) {
          return 1
        }
        return 0
      })
      return singleFilter
    }

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
