import { format } from 'date-fns'

export const getHoursBetweenTimes = (startTime: Date, endTime: Date) => {
  const hoursBetween =
    (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60

  return Math.abs(hoursBetween).toFixed(2)
}

export const toHourFormat = (date: Date) => format(date, 'HH:mm')

export const toStartAndEndHourFormat = (startTime: Date, endTime: Date) =>
  `${toHourFormat(startTime)}\x1b[2m-\x1b[0m${toHourFormat(endTime)}`

export const toShortDateFormat = (date: Date) => format(date, 'D.M.')