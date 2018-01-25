export enum EntryType {
  Break = 'break',
  Current = 'current',
  Lunch = 'lunch',
  Note = 'note'
}

export default class Entry {
  public duration?: number
  public time: Date
  public type: EntryType
  public note?: string
}
