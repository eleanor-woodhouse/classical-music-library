# Eleanor's Classical Music Library

A simple app to help me organise my classical music

#### First stage

Just my library.

Integrate with Spotify – which is terrible at organising your library no matter what the genre, but particularly bad
with classical music.

#### Further stages

- Integrate with Apple Music, Youtube, Soundcloud etc

- Creation of different libraries: e.g. Classical music; General; Radio shows/mixes

- Allow other users to create their own libraries which are populated from various sources, and which are organised by
  categories/filters of their own choosing. They will be able to choose from a set list of filters that are
  automatically populated from the data sources (Spotify etc). For entirely new filters/categories, new fields will be
  created on the domain objects for the user to populate manually.

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

The usual.

#### Terminal

```bash
npm i
npm run dev
```

## TODOS

### Immediate

Handle environment variables

Refactor Filter list items in Filter component

### For Stage One

### Automatically Populate Library from Spotify

This was close, but contrary to their docs, it turns out the Spotify API does not return information on album genres.

My current plan is to pull in EVERY saved album from my library, and create some UI to manually delete the albums I
don't want a part of my classical music library.

Currently the album data is hard coded in ./data/recordingsData.ts

### Persist Recordings Data

Move from saving recordings data in the file system to DynamoDB

### UI for creating filter categories

Currently, the filter categories that I want visible in the app are defined in one place, an array in
`./data/filterCategories.ts`

I have logic that automatically creates the filter categories and their options from this hard-coded array and the
recordings data (in `./data/makeFilters.ts`)

I want to create UI to choose/define these filter categories (the specific options for each filter will always be
dynamically pulled from the actual recording data)

### UI for Editing Recordings

For filter/organisational categories that don't exist on Spotify, I want to manually add them to each recording via UI
(currently I hard coded in `recordingsData.ts``)

Even for categories that do exist on Spotify, I may want to edit/add anyway.
