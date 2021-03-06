import {
  addHours,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds
} from 'date-fns'

import Entry, { EntryType } from './Entry'
import File from './File'

export default class Day {
  public entries: Entry[] = []
  public startTime: Date
  public workHours: number

  private file: File

  constructor(path: string, defaults: { date: Date; workHours: number }) {
    this.file = new File(path, defaults.date)

    try {
      const { entries, startTime, workHours } = this.file.readFile()

      entries.forEach((entry: Entry) => {
        const newEntry = new Entry(entry.type, entry.startTime, entry.endTime)
        newEntry.note = entry.note
        this.addEntry(newEntry)
      })

      this.startTime = startTime
      this.workHours = workHours
    } catch (err) {
      this.startTime = setMilliseconds(
        setSeconds(setMinutes(setHours(defaults.date, 8), 0), 0),
        0
      )

      this.workHours = defaults.workHours

      const lunchStartTime = setHours(this.startTime, 11)
      const lunchEndTime = addHours(lunchStartTime, 0.5)
      const lunchEntry = new Entry(
        EntryType.Lunch,
        lunchStartTime,
        lunchEndTime
      )

      this.addEntry(lunchEntry)
      this.save()
    }
  }

  public addEntry(entry: Entry) {
    this.entries.push(entry)
  }

  public getDurationOfEntriesByType(type: EntryType) {
    const entries = this.getEntriesByType(type)
    return entries.reduce(
      (previousValue, entry) => previousValue + entry.getDifference(),
      0
    )
  }

  public getEntriesByType(type: EntryType) {
    return this.entries
      .filter(entry => entry.type === type)
      .sort(
        (a, b) =>
          a.startTime > b.startTime ? 1 : b.startTime > a.startTime ? -1 : 0
      )
  }

  public getLatestEntry() {
    const entries = this.getEntriesByType(EntryType.Note).reverse()
    return entries[0]
  }

  public save() {
    const data = {
      entries: this.entries,
      startTime: this.startTime,
      workHours: this.workHours
    }

    this.file.save(data)
  }
}
