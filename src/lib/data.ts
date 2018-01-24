import {
  format,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds
} from 'date-fns'
import * as fs from 'fs'
import * as path from 'path'

import { EntryType } from './constants'

import { HOME_DIR, WORK_HOURS } from './config'

const now = new Date()

const file = path.resolve(HOME_DIR, `data/${format(now, 'YYYY-MM-DD')}.json`)

export interface IData {
  entries: IEntry[]
  startTime: Date
  workHours: number
}

export interface IEntry {
  duration?: number
  time?: Date
  type: string
  note?: string
}

export const addEntry = (entry: IEntry) => {
  const data = getData()
  const date = new Date()

  const dataWithNewEntry = {
    ...data,
    entries: [
      ...data.entries,
      {
        ...entry,
        time: date.toJSON()
      }
    ]
  }

  return saveData(dataWithNewEntry)
}

export const getData = () => {
  if (fs.existsSync(file)) {
    const json = require(file)

    const dataWithDates = {
      ...json,
      entries: json.entries.map((entry: any) => ({
        ...entry,
        time: new Date(entry.time)
      })),
      startTime: new Date(json.startTime)
    }

    return dataWithDates
  }

  const startTime = setMilliseconds(
    setSeconds(setMinutes(setHours(now, 8), 0), 0),
    0
  )

  const lunchTime = setHours(startTime, 11)

  const data: IData = {
    entries: [
      {
        duration: 0.5,
        time: lunchTime,
        type: EntryType.Lunch
      }
    ],
    startTime,
    workHours: WORK_HOURS
  }

  return saveData(data)
}

export const saveData = (data: IData) => {
  fs.writeFileSync(file, JSON.stringify(data, null, '  '))
  return data
}
