import { FC } from 'react'
import { PlayerNote } from '../types'
import { css } from '@emotion/css'

export type ChartProps = {
  notes: PlayerNote[]
  active: PlayerNote
  isPlaying: boolean
}

const chartStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  background-color: darkgray;
`

const itemStyle = css`
  padding: 10px;
  background-color: gray;
  border-radius: 6px;
`

export const Chart: FC<ChartProps> = ({ notes }) => {
  return (
    <div className={chartStyle}>
      {notes.map((item) => (
        <div key={item.id} className={itemStyle}>
          {item.name}
        </div>
      ))}
    </div>
  )
}
