export type PlayerNote = {
  type: 'note'
  id: string
  time: string
  note: string
  name: string
  index: number
}

export type ClickNote = {
  type: 'click-note'
  id: string
  barId: string
  note: string
  volume: number
  time: string
}

export type EndNote = {
  type: 'end-note'
  id: string
  time: string
}

export type ClickPlayerNote = ClickNote | EndNote
