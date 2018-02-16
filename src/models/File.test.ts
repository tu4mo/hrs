import * as path from 'path'

import File from './File'

describe('File', () => {
  const mockPath = path.resolve(__dirname, '..', '__mocks__')
  const date = new Date(2000, 0, 1)
  const file = new File(mockPath, date)

  test('getFile', () => {
    expect(file.getFile()).toEqual(path.resolve(mockPath, '2000-01-01.json'))
  })

  test('readFile', () => {
    const data = file.readFile()
    expect(Object.keys(data)[0]).toBe('entries')
    expect(data.entries[0].endTime).toBeInstanceOf(Date)

    const nonExistingDate = new Date(2000, 0, 2)
    const nonExistingFile = new File(mockPath, nonExistingDate)
    expect(() => nonExistingFile.readFile()).toThrow()
  })
})
