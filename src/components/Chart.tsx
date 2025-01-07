import { FC } from 'react'
import { PlayerNote } from '../types'
import { css } from '@emotion/css'

export type ChartProps = {
  notes: PlayerNote[]
  active: PlayerNote
  isPlaying: boolean
  onClick: (note: PlayerNote) => void
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
  cursor: pointer;
`

export const Chart: FC<ChartProps> = ({ notes, onClick, active }) => {
  return (
    <div className={chartStyle}>
      {notes.map((item) => {
        const onNoteClick = () => onClick(item)
        return (
          <div
            key={item.id}
            className={itemStyle}
            style={{ backgroundColor: active === item ? 'red' : undefined }}
            onClick={onNoteClick}
          >
            {item.name}
          </div>
        )
      })}
    </div>
  )
}
