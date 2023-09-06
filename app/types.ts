type Person = {
  firstName: string
  lastName: string
}

export type Filter = {
  name: string
  options: string[] | Person[]
}

type Track = {
  title: string
  length: string
  composer: Person[]
}

export type Recording = {
  id: number
  name: string
  recordingYear: number
  compositionYear: number[]
  composer: Person[]
  performer: Person[]
  size: string[]
  period: string[]
  instruments: string[]
  tracks: Track[]
  url: string
}
