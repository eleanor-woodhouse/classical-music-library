import { Filter, Person, Recording } from "../types"

// TODO refactor
export function sortRecords(
  sortConfig: { sortedField: Filter["id"] | "name" | null; direction: string },
  recordings: Recording[],
): Recording[] {
  let sortedRecordings = [...recordings]

  const { sortedField } = sortConfig

  if (sortedField !== null) {
    sortedRecordings.sort((a, b) => {
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
