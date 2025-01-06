import * as Tone from 'tone'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { PlayerNote } from '../types'
import { getClickPart } from './useClickPart'
import { getPianoPart } from './usePianoPart'
import { samplers } from '../samplers'
import { getClickNotes } from '../utils/getClickNotes'
import { Part } from 'tone'
import { isNil } from '../utils/utils'

export type UsePlayerApi = {
  play: () => void
  stop: () => void
  prepare: () => Promise<void>
  setActive: (active: PlayerNote) => void
  active: PlayerNote
  isPlaying: boolean
}

export function usePlayer(bpm: number, notes: PlayerNote[]): UsePlayerApi {
  const [isPlaying, setPlaying] = useState(false)
  const [clickPart, setClickPart] = useState<Part>()
  const [pianoPart, setPianoPart] = useState<Part>()
  const [active, setActiveInternal] = useState(notes[0]!)
  const clickNotes = useMemo(() => getClickNotes(notes), [notes, bpm])

  const resetActiveNote = () => setActive(notes[0]!)

  useEffect(() => {
    Tone.getTransport().bpm.value = bpm
  }, [bpm])

  useEffect(() => {
    const transport = Tone.getTransport()
    const onStart = () => {
      console.log('Started...')
      setPlaying(true)
    }
    const onStop = () => {
      console.log('Stopped...')
      setPlaying(false)
    }
    transport.on('start', onStart)
    transport.on('stop', onStop)

    return () => {
      transport.off('start', onStart)
      transport.off('stop', onStop)
    }
  }, [bpm, isPlaying, notes])

  useEffect(() => {
    const newPianoPart = getPianoPart(notes, (note: PlayerNote) => {
      setActiveInternal(note)
    })
    const newClickPart = getClickPart(clickNotes, () => {
      setPlaying(false)
      resetActiveNote()
    })
    setPianoPart(newPianoPart)
    setClickPart(newClickPart)

    return () => {
      newClickPart.stop()
      newClickPart.dispose()
      newPianoPart.stop()
      newPianoPart.dispose()
    }
  }, [notes, bpm])

  const play = () => {
    if (isNil(pianoPart) || isNil(clickPart)) {
      return
    }
    console.log('starting', active)
    const transport = Tone.getTransport()
    transport.position = active.time
    clickPart.startOffset = 0
    pianoPart.startOffset = 0
    clickPart.start()
    pianoPart.start()
    transport.start()
  }

  const stop = () => {
    Tone.getTransport().stop()
  }

  const prepare = async () => {
    samplers.click.toDestination()
    samplers.piano.toDestination()

    if (Tone.getContext().state !== 'running') {
      await Tone.getContext().resume()
      await Tone.start()
    }
    await Tone.loaded()
  }

  const setActive = (_newActive: PlayerNote) => {}

  return {
    play,
    stop,
    prepare,
    setActive,
    active,
    isPlaying,
  }
}
