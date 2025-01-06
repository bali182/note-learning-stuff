import { FC } from 'react'
import { Chart } from './Chart'
import { getRandomNotes } from '../utils/getRandomNotes'
import { css } from '@emotion/css'
import { usePlayer } from '../hooks/usePlayer'

const notes = getRandomNotes(5, 4)

const containerStyle = css`
  padding: 10px;
`

export const App: FC = () => {
  const { play, stop, prepare, isPlaying } = usePlayer(120, notes)
  const playStop = () => {
    prepare().then(() => {
      if (isPlaying) {
        stop()
      } else {
        play()
      }
    })
  }

  return (
    <div className={containerStyle}>
      <Chart notes={notes} active={notes[0]!} isPlaying={false} />
      <button onClick={playStop}>{isPlaying ? 'Stop' : 'Start'} </button>
    </div>
  )
}
