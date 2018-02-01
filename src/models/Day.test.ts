import { addHours, setHours } from 'date-fns'
import * as path from 'path'

import { WORK_HOURS } from '../lib/config'
import Day from './Day'
import Entry, { EntryType } from './Entry'

const date = new Date('2018-01-01')

jest.mock('fs', () => ({
  existsSync: () => false,
  writeFileSync: () => true
}))

describe('Day', () => {
  test('getEntriesByType', () => {
    const day = new Day(path.resolve(__dirname), {
      date,
      workHours: WORK_HOURS
    })

    const noteEntry = new Entry(
      EntryType.Note,
      new Date('2018-01-01T17:00:00.000Z'),
      new Date('2018-01-01T18:00:00.000Z')
    )
    noteEntry.note = 'Did some stuff and more'
    day.addEntry(noteEntry)

    const entriesByLunch = day.getEntriesByType(EntryType.Lunch)
    const entriesByNote = day.getEntriesByType(EntryType.Note)

    expect(entriesByLunch).toEqual([
      {
        endTime: addHours(setHours(day.startTime, 11), 0.5),
        startTime: setHours(day.startTime, 11),
        type: EntryType.Lunch
      }
    ])

    expect(entriesByNote).toEqual([
      {
        endTime: new Date('2018-01-01T18:00:00.000Z'),
        note: 'Did some stuff and more',
        startTime: new Date('2018-01-01T17:00:00.000Z'),
        type: EntryType.Note
      }
    ])
  })
})
