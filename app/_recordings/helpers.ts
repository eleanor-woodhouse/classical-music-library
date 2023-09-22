import { Filter, Person, Recording } from "../types"

// TODO refactor, figure out how to remove hard coding of non-alphabetised or numerical categories
export function sortRecords(
  sortConfig: { sortedField: Filter["id"] | "name" | null; direction: string },
  recordings: Recording[],
): Recording[] {
  let sortedRecordings = [...recordings]

  const { sortedField } = sortConfig

  if (sortedField !== null) {
    sortedRecordings.sort((a, b) => {
      if (sortedField === "size") {
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
        const firstValue = a[sortedField][0].toLowerCase() as keyof typeof sizeOrder
        const secondValue = b[sortedField][0].toLowerCase() as keyof typeof sizeOrder

        if (sizeOrder[firstValue] < sizeOrder[secondValue]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (sizeOrder[firstValue] > sizeOrder[secondValue]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      }
      if (sortedField === "period") {
        const periodOrder = {
          baroque: 1,
          classical: 2,
          romantic: 3,
          impressionist: 4,
          ["early modern"]: 5,
          ["20th century"]: 6,
        }
        const firstValue = a[sortedField][0].toLowerCase() as keyof typeof periodOrder
        const secondValue = b[sortedField][0].toLowerCase() as keyof typeof periodOrder
        if (periodOrder[firstValue] < periodOrder[secondValue]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (periodOrder[firstValue] > periodOrder[secondValue]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      }
      if (typeof a[sortedField][0] === "object") {
        const firstPersonA = a[sortedField][0] as Person
        const firstPersonB = b[sortedField][0] as Person

        if (firstPersonA.lastName && firstPersonB.lastName) {
          if (firstPersonA.lastName < firstPersonB.lastName) {
            return sortConfig.direction === "ascending" ? -1 : 1
          }
          if (firstPersonA.lastName > firstPersonB.lastName) {
            return sortConfig.direction === "ascending" ? 1 : -1
          }
          return 0
        }

        if (firstPersonA.lastName && !firstPersonB.lastName) {
          if (firstPersonA.lastName < firstPersonB.firstName) {
            return sortConfig.direction === "ascending" ? -1 : 1
          }
          if (firstPersonA.lastName > firstPersonB.firstName) {
            return sortConfig.direction === "ascending" ? 1 : -1
          }
          return 0
        }

        if (!firstPersonA.lastName && firstPersonB.lastName) {
          if (firstPersonA.firstName < firstPersonB.lastName) {
            return sortConfig.direction === "ascending" ? -1 : 1
          }
          if (firstPersonA.firstName > firstPersonB.lastName) {
            return sortConfig.direction === "ascending" ? 1 : -1
          }
          return 0
        }

        if (!firstPersonA.lastName && !firstPersonB.lastName) {
          if (firstPersonA.firstName < firstPersonB.firstName) {
            return sortConfig.direction === "ascending" ? -1 : 1
          }
          if (firstPersonA.firstName > firstPersonB.firstName) {
            return sortConfig.direction === "ascending" ? 1 : -1
          }
          return 0
        }
      }
      if (a[sortedField][0] < b[sortedField][0]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a[sortedField][0] > b[sortedField][0]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })
  }

  return sortedRecordings
}
