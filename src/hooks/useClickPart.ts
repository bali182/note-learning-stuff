import { Part } from 'tone'
import { ClickPlayerNote } from '../types'
import { samplers } from '../samplers'

export function getClickPart(
  notes: ClickPlayerNote[],
  onEnd: () => void,
): Part {
  const part = new Part((time, note) => {
    if (note.type === 'click-note') {
      samplers.click.triggerAttackRelease(note.note, '8n', time, note.volume)
    } else {
      onEnd()
    }
  }, notes)
  return part
}
