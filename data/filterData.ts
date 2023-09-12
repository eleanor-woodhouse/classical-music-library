import { Filter } from "../app/types"

// TODO dynamically create this array from the recordingsData

const filterData: Filter[] = [
  {
    id: "instruments",
    name: "Instruments",
    options: ["Piano", "Strings", "Voice", "Orchestra"],
  },
  {
    id: "composer",
    name: "Composer",
    options: [
      {
        firstName: "Frédéric",
        lastName: "Chopin",
      },
      {
        firstName: "Edvard",
        lastName: "Grieg",
      },
      {
        firstName: "Franz",
        lastName: "Liszt",
      },
      {
        firstName: "Franz",
        lastName: "Schubert",
      },
      {
        firstName: "Claude",
        lastName: "Debussy",
      },
      {
        firstName: "Maurice",
        lastName: "Ravel",
      },
    ],
  },
  {
    id: "period",
    name: "Period",
    options: ["Romantic", "Impressionist", "Classical"],
  },
]

export default filterData
