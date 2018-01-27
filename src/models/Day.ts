import { setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns'

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
      this.entries = entries
      this.startTime = startTime
      this.workHours = workHours
    } catch (err) {
      this.startTime = setMilliseconds(
        setSeconds(setMinutes(setHours(defaults.date, 8), 0), 0),
        0
      )

      this.workHours = defaults.workHours

      const lunchTime = setHours(this.startTime, 11)

      const lunchEntry = new Entry()
      lunchEntry.duration = 0.5
      lunchEntry.time = lunchTime
      lunchEntry.type = EntryType.Lunch

      this.addEntry(lunchEntry)
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

    this.file.save(data)
  }
}
