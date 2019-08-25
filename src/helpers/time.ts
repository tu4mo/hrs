import { format } from 'date-fns'

export const toFixedHours = (hours: number) => Math.abs(hours).toFixed(2)

export const toHourFormat = (date: Date) => format(date, 'HH:mm')

export const secondsToHours = (seconds: number) =>
  Math.abs(Math.round(seconds / 60 / 60 * 100) / 100)

export const toStartAndEndHourFormat = (startTime: Date, endTime: Date) =>
  `${toHourFormat(startTime)}\x1b[2m-\x1b[0m${toHourFormat(endTime)}`

export const toShortDateFormat = (date: Date) => format(date, 'd.M.')
