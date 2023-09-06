import { Recording } from "./types"

const recordingsData: Recording[] = [
  {
    id: 1,
    name: "Debussy & Ravel: String Quartets",
    recordingYear: 2018,
    compositionYear: [1893, 1903],
    composer: [
      {
        firstName: "Claude",
        lastName: "Debussy",
      },
      {
        firstName: "Maurice",
        lastName: "Ravel",
      },
    ],
    performer: [
      {
        firstName: "Jerusalem Quartet",
        lastName: "",
      },
    ],
    size: ["Quartet"],
    period: ["Impressionist"],
    instruments: ["Strings"],
    tracks: [
      {
        title: "String Quarter in G Minor, Op. 10: I. Animé et très décidé",
        length: "6:35",
        composer: [
          {
            firstName: "Claude",
            lastName: "Debussy",
          },
        ],
      },
    ],
    url: "https://open.spotify.com/album/77Eg2dHidrefgsS3GZ88nK?si=FDaEvSNoQlqTlp0piEOZmg",
  },
  {
    id: 2,
    name: "Chopin: 26 Préludes",
    recordingYear: 1987,
    compositionYear: [1839],
    composer: [
      {
        firstName: "Frédéric",
        lastName: "Chopin",
      },
    ],
    performer: [
      {
        firstName: "Martha",
        lastName: "Argerich",
      },
    ],
    size: ["Soloist"],
    period: ["Romantic"],
    instruments: ["Piano"],
    tracks: [
      {
        title: "24 Préludes, Op. 28: No. 1 in C Major",
        length: "0:31",
        composer: [
          {
            firstName: "Frédéric",
            lastName: "Chopin",
          },
        ],
      },
    ],
    url: "https://open.spotify.com/album/3baJOyeM5b3t8CoOOeRKH6?si=nZIhtWrySyKsQaCJ2RazDg",
  },
  {
    id: 3,
    name: "Grieg: Lyric Pieces",
    recordingYear: 1974,
    compositionYear: [1867],
    composer: [
      {
        firstName: "Edvard",
        lastName: "Grieg",
      },
    ],
    performer: [
      {
        firstName: "Edvard",
        lastName: "Grieg",
      },
    ],
    size: ["Soloist"],
    period: ["Romantic"],
    instruments: ["Piano"],
    tracks: [
      {
        title: "Lyric Pieces Book I, Op. 12: No. 1 Arietta",
        length: "1:25",
        composer: [
          {
            firstName: "Edvard",
            lastName: "Grieg",
          },
        ],
      },
    ],
    url: "https://open.spotify.com/album/3GbarUsFr9ZQAraOJipds8?si=E8P9oLD8RT6LBZcYicXKkA",
  },
  {
    id: 4,
    name: "Liszt: Geistliche Chormusik",
    recordingYear: 2015,
    compositionYear: [1869],
    composer: [
      {
        firstName: "Franz",
        lastName: "Liszt",
      },
    ],
    performer: [
      {
        firstName: "Kammerchor I Vocalisti",
        lastName: "",
      },
      {
        firstName: "Hans-Joachim",
        lastName: "Lustig",
      },
    ],
    size: ["Choir"],
    period: ["Romantic"],
    instruments: ["Voice"],
    tracks: [
      {
        title: "Pater noster II, S. 29",
        length: "9:49",
        composer: [
          {
            firstName: "Franz",
            lastName: "Liszt",
          },
        ],
      },
    ],
    url: "https://open.spotify.com/album/4GgIYgZFwbQV6tzg6FKWav?si=nEs9d2vHTwecZoEwY75P6w",
  },
  {
    id: 5,
    name: "Schubert: Piano Trios In E Flat Major, D.929 and D.897",
    recordingYear: 1989,
    compositionYear: [1827],
    composer: [
      {
        firstName: "Franz",
        lastName: "Schubert",
      },
    ],
    performer: [
      {
        firstName: "Stuttgart Piano Trio",
        lastName: "",
      },
    ],
    size: ["Trio"],
    period: ["Romantic", "Classical"],
    instruments: ["Piano"],
    tracks: [
      {
        title: "Piano Trio No. 2 in E Flat Major, Op.100, D. 929: I. Allegro",
        length: "16:08",
        composer: [
          {
            firstName: "Franz",
            lastName: "Schubert",
          },
        ],
      },
    ],
    url: "https://open.spotify.com/album/3aVRhOEridUNs7e0OLUoqL?si=XR0hAAzPQeaCl-vyN16H7A",
  },
]

export default recordingsData
