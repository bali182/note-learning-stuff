import { PlayerNote } from '../types'
import EventEmitter from 'eventemitter3'
import TypedEmitter from 'typed-emitter'

export type ContentPlayerEvents = {
  'active-note-changed': (note: PlayerNote) => void
  'playback-changed': (isPlaying: boolean) => void
}

export const BaseContentPlayerEventEmitter =
  EventEmitter as unknown as new () => TypedEmitter<ContentPlayerEvents>
