import { setHours, setMinutes } from 'date-fns'

import { getOverview } from '../lib/overview'
import Day from '../models/Day'

export const start = (day: Day, args: string[]) => {
  const now = new Date()

  const [hours = now.getHours(), minutes = now.getMinutes()] = args[0]
    ? args[0].split(':').map(_ => parseInt(_, 10))
    : []

  day.startTime = setMinutes(setHours(day.startTime, hours), minutes)
  day.save()

  console.log(getOverview(day))
}
