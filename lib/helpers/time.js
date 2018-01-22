const format = require('date-fns/format')

const getHoursBetweenTimes = (startTime, endTime) => {
  const hoursBetween =
    (Date.parse(endTime) - Date.parse(startTime)) / 1000 / 60 / 60

  return hoursBetween.toFixed(2)
}

const toHourFormat = value => format(value, 'HH:mm')

const toStartAndEndHourFormat = (startTime, endTime) =>
  `${toHourFormat(startTime)}\x1b[2m-\x1b[0m${toHourFormat(endTime)}`

const toShortDateFormat = value => format(value, 'D.M.')

module.exports = {
  getHoursBetweenTimes,
  toHourFormat,
  toShortDateFormat,
  toStartAndEndHourFormat
}
