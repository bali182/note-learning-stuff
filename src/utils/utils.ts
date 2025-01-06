export function randomElement<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)]
}

export function getBarLength(bpm: number, beatsPerBar: number = 4): number {
  // Calculate the length of one beat in milliseconds
  const millisecondsPerBeat = (60 / bpm) * 1000

  // Calculate the length of the bar (measure) in milliseconds
  const millisecondsPerBar = millisecondsPerBeat * beatsPerBar

  return millisecondsPerBar
}

export function isNil<T>(
  input: T | null | undefined,
): input is null | undefined {
  return input === null || input === undefined
}

export function noop() {}

export function isNotNil<T>(input: T | null | undefined): input is T {
  return input !== null && input !== undefined
}
