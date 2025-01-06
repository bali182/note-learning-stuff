import { nanoid } from 'nanoid'
import { ClickPlayerNote, PlayerNote } from '../types'

export const CLICK_NOTE = 'C1'

export function getClickNotes(notes: PlayerNote[]): ClickPlayerNote[] {
  const output: ClickPlayerNote[] = []
  for (let i = 0; i < notes.length; i++) {
    const pianoNote = notes[i]!
    for (let beat = 0; beat < 4; beat++) {
      output.push({
        type: 'click-note',
        id: nanoid(8),
        barId: pianoNote.id,
        note: CLICK_NOTE,
        time: `${i}:${beat}:0`,
        volume: beat === 0 ? 0.55 : 0.3,
      })
    }
  }
  output.push({ type: 'end-note', id: nanoid(8), time: `${notes.length}:0:0` })
  return output
}
