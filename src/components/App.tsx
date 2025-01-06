import { FC } from 'react'
import { Chart } from './Chart'
import { getRandomNotes } from '../getRandomNotes'
import { css } from '@emotion/css'

const notes = getRandomNotes(5, 16)

const containerStyle = css`
  padding: 10px;
`

export const App: FC = () => {
  return (
    <div className={containerStyle}>
      <Chart notes={notes} active={notes[0]!} isPlaying={false} />
    </div>
  )
}
