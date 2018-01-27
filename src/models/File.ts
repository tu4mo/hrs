import * as fs from 'fs'
import * as path from 'path'

import { format } from 'date-fns'

export default class File {
  private file: string

  constructor(pathToFile: string, date: Date) {
    this.file = path.resolve(pathToFile, `${format(date, 'YYYY-MM-DD')}.json`)
  }

  public readFile() {
    if (fs.existsSync(this.file)) {
      const data = fs.readFileSync(this.file)
      return this.parseJsonWithDates(data)
    } else {
      throw new Error()
    }
  }

  public save(data: object) {
    fs.writeFileSync(this.file, JSON.stringify(data, null, '  '))
  }

  private parseJsonWithDates(data: any) {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

    const reviver = (key: string, value: any) =>
      typeof value === 'string' && dateFormat.test(value)
        ? new Date(value)
        : value

    return JSON.parse(data, reviver)
  }
}
