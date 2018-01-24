#!/usr/bin/env node

import { install } from './lib/install'
install()

import { setHours, setMinutes } from 'date-fns'

import { EntryType } from './lib/constants'
import { addEntry, getData, saveData } from './lib/data'
import { getHelp } from './lib/help'
import { getOverview } from './lib/overview'

const [, , command, ...args] = process.argv

switch (command) {
  case 'break': {
    // addEntry({ type: 'break' })
    const data = getData()
    console.log(getOverview(data))
    break
  }

  case 'note': {
    const data = addEntry({
      note: args.join(' '),
      time: new Date(),
      type: EntryType.Note
    })
    console.log(getOverview(data))
    break
  }

  case 'start': {
    const [hours, minutes] = args[0].split(':')
    const data = getData()
    const newData = {
      ...data,
      startTime: setMinutes(
        setHours(data.startTime, parseInt(hours, 10)),
        parseInt(minutes, 10)
      )
    }
    saveData(newData)
    console.log(getOverview(newData))
    break
  }

  case 'help':
  case '-?':
  case '--help': {
    console.log(`\n${getHelp()}\n`)
    break
  }

  default: {
    const data = getData()
    console.log(getOverview(data))
    break
  }
}

process.exit(0)
