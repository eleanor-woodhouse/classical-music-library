export type Person = {
  firstName: string
  lastName: string
}

export type Filter = {
  id: keyof FilterState
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
  tracks?: Track[]
  url: string
}

export interface FilterState {
  instruments: {
    piano: boolean
    strings: boolean
    voice: boolean
    orchestra: boolean
  }
  composer: {
    chopin: boolean
    grieg: boolean
    liszt: boolean
    schubert: boolean
    debussy: boolean
    ravel: boolean
  }
  period: {
    romantic: boolean
    impressionist: boolean
    classical: boolean
  }
}

export type SelectedFilters = {
  instruments: string[]
  composer: string[]
  period: string[]
}
