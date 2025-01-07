import * as Tone from 'tone'
import { Part } from 'tone'
import { samplers } from '../samplers'
import { ClickPlayerNote, PlayerNote } from '../types'
import { BaseContentPlayerEventEmitter } from './events'

const START_TIME = '0:0:0'

export class ContentPlayer extends BaseContentPlayerEventEmitter {
  private pianoPart: Part = undefined!
  private clickPart: Part = undefined!
  private time: string = START_TIME

  constructor(
    private readonly pianoNotes: PlayerNote[],
    private readonly clickNotes: ClickPlayerNote[],
  ) {
    super()
    this.createPianoPart()
    this.createClickPart()
  }

  protected createPianoPart() {
    this.pianoPart = new Part((time, note) => {
      samplers.piano.triggerAttackRelease(note.note, '4n.', time)
      this.time = note.time
      this.emit('active-note-changed', note)
    }, this.pianoNotes)
  }

  protected createClickPart() {
    this.clickPart = new Part((time, note) => {
      if (note.type === 'click-note') {
        samplers.click.triggerAttackRelease(note.note, '8n', time, note.volume)
      } else {
        this.stop()
        this.emit('active-note-changed', this.pianoNotes[0]!)
        this.time = START_TIME
      }
    }, this.clickNotes)
  }

  public async prepare() {
    if (Tone.getContext().state !== 'running') {
      await Tone.getContext().resume()
    }
    await Tone.loaded()

    samplers.piano.toDestination()
    samplers.click.toDestination()

    Tone.getTransport().position = this.time

    if (this.pianoPart.state !== 'started') {
      this.pianoPart.start(this.time)
    }
    if (this.clickPart.state !== 'started') {
      this.clickPart.start(this.time)
    }
  }

  public start() {
    this.emit('playback-changed', true)
    const transport = Tone.getTransport()
    transport.stop()
    transport.position = this.time
    transport.start()
  }

  public stop() {
    this.emit('playback-changed', false)
    Tone.getTransport().stop()
  }

  public destroy() {
    console.log('destroying')
    Tone.getTransport().stop()
    this.clickPart.stop()
    this.clickPart.dispose()
    this.pianoPart.stop()
    this.pianoPart.dispose()
  }

  public setActiveNote(note: PlayerNote): void {
    if (!this.pianoNotes.includes(note)) {
      throw new Error(`Unknown note: ${JSON.stringify(note)}`)
    }

    const transport = Tone.getTransport()
    const playbackState = transport.state

    if (playbackState === 'started') {
      transport.stop()
    }

    this.time = note.time
    transport.position = this.time
    this.emit('active-note-changed', note)

    if (playbackState === 'started') {
      transport.start()
    }
  }

  public setBpm(bpm: number): void {
    Tone.getTransport().bpm.value = bpm
  }
}
