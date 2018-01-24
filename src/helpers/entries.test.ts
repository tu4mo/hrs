import { EntryType } from '../lib/constants'
import { getEntriesByType } from './entries'

const lunchEntries = [
  {
    duration: 0.5,
    time: new Date('2018-01-23T09:00:00.000Z'),
    type: EntryType.Lunch
  }
]

const noteEntries = [
  {
    note: 'Did some stuff and more',
    time: new Date('2018-01-23T17:00:00.000Z'),
    type: EntryType.Note
  },
  {
    note: 'More stuff and so on',
    time: new Date('2018-01-23T18:50:00.000Z'),
    type: EntryType.Note
  }
]

const entries = [...lunchEntries, ...noteEntries]

test('getEntriesByType', () => {
  const entriesByLunch = getEntriesByType(entries, EntryType.Lunch)
  const entriesByNote = getEntriesByType(entries, EntryType.Note)
  expect(entriesByLunch).toEqual(lunchEntries)
  expect(entriesByNote).toEqual(noteEntries)
})
