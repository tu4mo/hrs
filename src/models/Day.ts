import * as fs from 'fs'
import * as path from 'path'

import {
  format,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds
} from 'date-fns'

import Entry, { EntryType } from './Entry'

export default class Day {
  public file: string

  public entries: Entry[] = []
  public startTime: Date
  public workHours: number

  constructor(options: { date: Date; path: string; workHours: number }) {
    this.file = path.resolve(
      options.path,
      `${format(options.date, 'YYYY-MM-DD')}.json`
    )

    if (fs.existsSync(this.file)) {
      const data = require(this.file)
      const dataWithRealDates = this.convertTimesToDates(data)

      this.entries = dataWithRealDates.entries
      this.startTime = dataWithRealDates.startTime
      this.workHours = dataWithRealDates.workHours

      return
    }

    this.startTime = setMilliseconds(
      setSeconds(setMinutes(setHours(options.date, 8), 0), 0),
      0
    )

    this.workHours = options.workHours

    const lunchTime = setHours(this.startTime, 11)

    const lunchEntry = new Entry()
    lunchEntry.duration = 0.5
    lunchEntry.time = lunchTime
    lunchEntry.type = EntryType.Lunch

    this.addEntry(lunchEntry)
  }

  public convertTimesToDates(data: any) {
    return {
      ...data,
      entries: data.entries.map((entry: any) => ({
        ...entry,
        time: new Date(entry.time)
      })),
      startTime: new Date(data.startTime)
    }
  }

  public addEntry(entry: Entry) {
    this.entries.push(entry)
    this.save()
  }

  public getEntriesByType(type: EntryType) {
    return this.entries
      .filter(entry => entry.type === type)
      .sort((a, b) => (a.time > b.time ? 1 : b.time > a.time ? -1 : 0))
  }

  public save() {
    const data = {
      entries: this.entries,
      startTime: this.startTime,
      workHours: this.workHours
    }

    fs.writeFileSync(this.file, JSON.stringify(data, null, '  '))
  }
}
