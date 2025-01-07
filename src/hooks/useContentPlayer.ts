import { useEffect, useState } from 'react'
import { PlayerNote } from '../types'
import { getClickNotes } from '../utils/getClickNotes'
import { ContentPlayer } from '../player/ContentPlayer'

export type UseContentPlayerApi = {
  play: () => void
  stop: () => void
  prepare: () => Promise<void>
  setActive: (active: PlayerNote) => void
  active: PlayerNote
  isPlaying: boolean
}

export function useContentPlayer(
  bpm: number,
  notes: PlayerNote[],
): UseContentPlayerApi {
  const [isPlaying, setPlaying] = useState(false)
  const [player, setPlayer] = useState<ContentPlayer>()
  const [active, setActiveInternal] = useState(notes[0]!)

  useEffect(() => {
    const newPlayer = new ContentPlayer(notes, getClickNotes(notes))
    setPlayer(newPlayer)
    return () => newPlayer.destroy()
  }, [notes])

  useEffect(() => {
    player?.setBpm(bpm)
  }, [player, bpm])

  useEffect(() => {
    player?.on('active-note-changed', setActiveInternal)
    player?.on('playback-changed', setPlaying)
    return () => {
      player?.off('active-note-changed', setActiveInternal)
      player?.off('playback-changed', setPlaying)
    }
  }, [player, setActiveInternal, setPlaying])

  const play = () => {
    player?.start()
  }

  const stop = () => {
    player?.stop()
  }

  const prepare = async () => {
    player?.prepare()
  }

  const setActive = (note: PlayerNote) => {
    player?.setActiveNote(note)
  }

  return {
    play,
    stop,
    prepare,
    setActive,
    active,
    isPlaying,
  }
}
