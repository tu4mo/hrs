export enum EntryType {
  Break = 'break',
  Current = 'current',
  Lunch = 'lunch',
  Note = 'note'
}

export default class Entry {
  public duration?: number
  public endTime: Date
  public startTime: Date
  public type: EntryType
  public note?: string

  constructor(type: EntryType, startTime: Date, endTime: Date) {
    this.endTime = endTime
    this.startTime = startTime
    this.type = type
  }
}
