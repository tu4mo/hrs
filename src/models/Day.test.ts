import { setHours } from 'date-fns'
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
    const day = new Day({
      date,
      path: path.resolve(__dirname),
      workHours: WORK_HOURS
    })

    const noteEntry = new Entry()
    noteEntry.note = 'Did some stuff and more'
    noteEntry.time = new Date('2018-01-01T17:00:00.000Z')
    noteEntry.type = EntryType.Note
    day.addEntry(noteEntry)

    const entriesByLunch = day.getEntriesByType(EntryType.Lunch)
    const entriesByNote = day.getEntriesByType(EntryType.Note)

    expect(entriesByLunch).toEqual([
      {
        duration: 0.5,
        time: setHours(day.startTime, 11),
        type: EntryType.Lunch
      }
    ])

    expect(entriesByNote).toEqual([
      {
        note: 'Did some stuff and more',
        time: new Date('2018-01-01T17:00:00.000Z'),
        type: EntryType.Note
      }
    ])
  })
})
