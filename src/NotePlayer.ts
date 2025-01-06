import * as Tone from 'tone'
import { samplers } from './samplers'

export class NotePlayer {
  private part: Tone.Part
  private clickPart: Tone.Part
  private repeatId: number | undefined = undefined

  constructor(bpm: number, notes: string[]) {
    Tone.getTransport().bpm.value = bpm

    const events = notes.map((note, index) => ({
      time: `${index}:0:0`,
      note,
    }))

    this.part = new Tone.Part((time, note) => {
      console.log('Piano', note)
      samplers.piano.triggerAttackRelease(note.note, '4n.', time)
    }, events)

    const clickEvents = []
    for (let i = 0; i < notes.length; i++) {
      for (let beat = 0; beat < 4; beat++) {
        clickEvents.push([`${i}:${beat}:0`, 'C1'])
      }
    }

    this.clickPart = new Tone.Part((time) => {
      samplers.click.triggerAttackRelease('C1', '8n', time, 0.5)
    }, clickEvents)

    samplers.piano.toDestination()
    samplers.click.toDestination()
  }

  async prepare() {
    if (Tone.getContext().state !== 'running') {
      await Tone.getContext().resume()
      await Tone.start()
    }
    await Tone.loaded()
  }

  start() {
    this.part.startOffset = 0
    this.clickPart.startOffset = 0
    Tone.getTransport().position = '2:0:0'
    this.part.start(0)
    this.clickPart.start(0)
    Tone.getTransport().start()
  }

  stop() {
    Tone.getTransport().stop()
    if (this.repeatId) {
      Tone.getTransport().clear(this.repeatId)
      console.log('Stopped transport')
    }
  }

  setPosition(bar: number) {
    Tone.getTransport().position = `${bar}:0:0`
  }

  getCurrentBar(position: Tone.Unit.Time | number | string) {
    if (typeof position === 'string') {
      return Math.floor(parseFloat(position.split(':')[0]!))
    } else if (typeof position === 'number') {
      return Math.floor(position / 4)
    } else {
      return 0
    }
  }
}
