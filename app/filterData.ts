import { Filter } from "./types"

const filters: Filter[] = [
  {
    name: "Instruments",
    options: ["Piano", "Strings", "Voice", "Orchestra"],
  },
  {
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
    name: "Period",
    options: ["Romantic", "Impressionist", "Classical"],
  },
]

export default filters
