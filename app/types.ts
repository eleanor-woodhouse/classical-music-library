import { categories } from "@/data/filterCategories"

export type Person = {
  firstName: string
  lastName: string
}

export type Filter = {
  id: (typeof categories)[number]
  name: string
  options: string[] | Person[]
}

type ExternalUrls = {
  spotify: string
  image: string
  api: string
}

export type Recording = {
  id: string
  addedDate: string
  name: string
  recordingYear: string
  compositionYear: string[]
  composer: Person[]
  performer: Person[]
  size: string[]
  period: string[]
  instruments: string[]
  mood: string[]
  urls: ExternalUrls
  label: string
}

export type FilterState = {
  [K in Filter["id"]]: Record<string, boolean>
}

export type SelectedFilters = {
  [K in Filter["id"]]: string[]
}
