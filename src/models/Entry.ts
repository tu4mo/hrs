import { differenceInSeconds } from 'date-fns'

export enum EntryType {
  Break = 'break',
  Current = 'current',
  Lunch = 'lunch',
  Note = 'note'
}

export default class Entry {
  public endTime: Date
  public startTime: Date
  public type: EntryType
  public note?: string

  constructor(type: EntryType, startTime: Date, endTime: Date) {
    this.endTime = endTime
    this.startTime = startTime
    this.type = type
  }

  public getDifference() {
    return differenceInSeconds(this.endTime, this.startTime)
  }
}
