import { Part } from 'tone'
import { PlayerNote } from '../types'
import { useMemo } from 'react'
import { samplers } from '../samplers'

export function getPianoPart(
  notes: PlayerNote[],
  onPlay: (note: PlayerNote) => void,
): Part {
  const part = new Part((time, note) => {
    samplers.piano.triggerAttackRelease(note.note, '4n.', time)
    onPlay(note)
  }, notes)
  return part
}
