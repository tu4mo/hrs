import { setHours, setMinutes } from 'date-fns'

import { getOverview } from '../lib/overview'
import Day from '../models/Day'

export const start = (day: Day, args: string[]) => {
  const [hours, minutes] = args[0].split(':')
  day.startTime = setMinutes(
    setHours(day.startTime, parseInt(hours, 10)),
    parseInt(minutes, 10)
  )
  day.save()

  console.log(getOverview(day))
}
