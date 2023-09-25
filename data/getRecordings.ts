import { recordings } from "@/data/recordingsData"
import { Recording } from "../app/types"

// TODO replace this fake promise with a call to a database to retrieve recordings
// Once database is in place, and I've figured out how to map spotify data onto
// my domain objects – requires a way of finding out how to filter out only
// classical muisc recordings
export function getRecordings(): Promise<Recording[]> {
  return new Promise((resolve, reject) => {
    if (recordings) {
      resolve(recordings)
    }
    reject("Could not retrieve recordings")
  })
}
