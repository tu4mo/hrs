const format = require('date-fns/format')
const fs = require('fs')
const path = require('path')

const setHours = require('date-fns/set_hours')
const setMilliseconds = require('date-fns/set_milliseconds')
const setMinutes = require('date-fns/set_minutes')
const setSeconds = require('date-fns/set_seconds')

const { ENTRY_LUNCH } = require('./constants')

const { HOME_DIR, WORK_HOURS } = require('./config')

const now = new Date()

const file = path.resolve(HOME_DIR, `data/${format(now, 'YYYY-MM-DD')}.json`)

const addEntry = entry => {
  const data = getData()
  const date = new Date()

  const dataWithNewEntry = {
    ...data,
    entries: {
      ...data.entries,
      [date.toJSON()]: entry
    }
  }

  return saveData(dataWithNewEntry)
}

const getData = () => {
  if (fs.existsSync(file)) {
    return require(file)
  }

  const startTime = setMilliseconds(
    setSeconds(setMinutes(setHours(now, 8), 0), 0),
    0
  )

  const lunchTime = setHours(startTime, 11).toJSON()

  const data = {
    startTime: startTime.toJSON(),
    workHours: WORK_HOURS,
    entries: {
      [lunchTime]: {
        type: ENTRY_LUNCH,
        duration: 0.5
      }
    }
  }

  return saveData(data)
}

const saveData = data => {
  fs.writeFileSync(file, JSON.stringify(data, null, '  '))
  return data
}

module.exports = {
  addEntry,
  getData,
  saveData
}
