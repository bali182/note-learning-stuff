import { nanoid } from 'nanoid'
import { PlayerNote } from '../types'
import { randomElement } from './utils'

export const INDEX_TO_NOTE = new Map([
  [0, ['C']],
  [1, ['C#', 'Db']],
  [2, ['D']],
  [3, ['D#', 'Eb']],
  [4, ['E']],
  [5, ['F']],
  [6, ['F#', 'Gb']],
  [7, ['G']],
  [8, ['G#', 'Ab']],
  [9, ['A']],
  [10, ['A#', 'Bb']],
  [11, ['B']],
])

export const NOTE_TO_INDEX = Array.from(INDEX_TO_NOTE.entries()).reduce(
  (map, [index, notes]) => {
    for (const note of notes) {
      map.set(note, index)
    }
    return map
  },
  new Map<string, number>(),
)

export const ALL_NOTES = Array.from(INDEX_TO_NOTE.values()).flatMap(
  (notes) => notes,
)

export function getRandomNotes(
  octave: number,
  amount: number,
  notes: string[] = ALL_NOTES,
): PlayerNote[] {
  const output: PlayerNote[] = []
  for (let i = 0; i < amount; i += 1) {
    const noteName = randomElement(notes)!
    const withOctave = `${noteName}${octave}`
    const index = NOTE_TO_INDEX.get(noteName)!
    const note: PlayerNote = {
      type: 'note',
      id: nanoid(8),
      time: `${i}:0:0`,
      index,
      note: withOctave,
      name: noteName,
    }
    output.push(note)
  }

  return output
}
