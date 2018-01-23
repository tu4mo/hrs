const { getEntriesByType } = require('./entries')
const { ENTRY_LUNCH, ENTRY_NOTE } = require('../constants')

const lunchEntries = [
  {
    duration: 0.5,
    time: '2018-01-23T09:00:00.000Z',
    type: ENTRY_LUNCH
  }
]

const noteEntries = [
  {
    note: 'Did some stuff and more',
    time: '2018-01-23T17:00:00.000Z',
    type: ENTRY_NOTE
  },
  {
    note: 'More stuff and so on',
    time: '2018-01-23T18:50:00.000Z',
    type: ENTRY_NOTE
  }
]

const entries = [...lunchEntries, ...noteEntries]

test('getEntriesByType', () => {
  const entriesByLunch = getEntriesByType(entries, ENTRY_LUNCH)
  const entriesByNote = getEntriesByType(entries, ENTRY_NOTE)
  expect(entriesByLunch).toEqual(lunchEntries)
  expect(entriesByNote).toEqual(noteEntries)
})
