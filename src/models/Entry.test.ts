import Entry, { EntryType } from './Entry'

describe('Entry', () => {
  test('getDifference', () => {
    const entry = new Entry(
      EntryType.Note,
      new Date('2018-01-01T17:00:00.000Z'),
      new Date('2018-01-01T18:00:00.000Z')
    )
    expect(entry.getDifference()).toEqual(3600)
  })
})
